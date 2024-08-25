package handlers

import (
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg/dtos"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetJobByIdHandler(c *gin.Context, id int) (error, dtos.JobDto) {
	var job tables.Job
	var response dtos.JobDto
	var db = database.Db.WithContext(c)

	err := db.First(&job, id).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		logger.S().Errorf(err.Error())
		return errors.New("job not found"), response
	}

	if err != nil {
		return err, response
	}

	// Map entities.Job to JobDto
	response.Id = job.ID
	response.Name = job.Name

	return nil, response

}
