package handlers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"server/internal/database"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg/dtos"
)

func EditJobHandler(c *gin.Context, id int, jobRequest dtos.PostJobRequest) (uint, error) {

	var job tables.Job
	var db = database.Db.WithContext(c)

	// Check if a job with the same number exists
	result := db.First(&job, id)
	if result.Error != nil {
		return 0, errors.New("job not found")
	}

	job.Name = jobRequest.Name
	job.JobNr = jobRequest.JobNr

	result = db.Save(&job)

	if result.Error != nil {
		logger.S().Errorf("Could not update Job with name: %s, Error:%v", job.Name, result.Error)
		return 0, result.Error
	}
	return job.ID, nil
}
