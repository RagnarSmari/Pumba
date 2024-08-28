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
	var timestamps []dtos.TimestampDto
	var db = database.Db.WithContext(c)

	result := db.Model(&tables.Timestamp{}).Where("job_id = ?", jobId).Joins("left join jobs on jobs.id = timestamps.job_id").Scan(&timestamps)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return errors.New("Job not found"), nil
	}

	if result.Error != nil {
		return result.Error, nil
	}

	return nil, timestamps
}
