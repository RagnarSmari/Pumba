package handlers

import (
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllTimestampsForJobHandler(c *gin.Context, jobId int) (error, []dtos.TimestampDto) {
	var timestamps []tables.Timestamp
	var db = database.Db.WithContext(c)

	err := db.Where("job_id = ?", jobId).Find(&timestamps).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
	}

	if err != nil {
		return err, nil
	}

	// Map entities.Timestamp to TimestampDto
	var timestampDtos []dtos.TimestampDto
	for _, timestamp := range timestamps {
		timestampDto := dtos.TimestampDto{
			TotalHours: timestamp.TotalHours,
		}
		timestampDtos = append(timestampDtos, timestampDto)
	}

	return nil, timestampDtos
}
