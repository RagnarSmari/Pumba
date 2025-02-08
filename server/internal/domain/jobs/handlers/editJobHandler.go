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

	db.First(&job, id)

	if job.JobNr != jobRequest.JobNr {
		result := db.Where("job_nr = ?", jobRequest.JobNr).First(&job)
		if result.Error == nil {
			return 0, errors.New("job already exists")
		}
		job.JobNr = jobRequest.JobNr
	}

	if job.Name != jobRequest.Name {
		result := db.Where("name = ?", jobRequest.Name).First(&job)
		if result.Error == nil {
			return 0, errors.New("job already exists")
		}
		job.Name = jobRequest.Name
	}

	result := db.Save(&job)

	if result.Error != nil {
		logger.S().Errorf("Could not update Job with name: %s, Error:%v", job.Name, result.Error)
		return 0, result.Error
	}
	return job.ID, nil
}
