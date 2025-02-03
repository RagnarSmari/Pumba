package handlers

import (
	"context"
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg/dtos"
)

func CreateNewJobHandler(ctx context.Context, jobRequest dtos.PostJobRequest) (uint, error) {

	var job tables.Job
	var db = database.Db.WithContext(ctx)

	// Check if a job with the same number exists
	var jobCount int64
	db.Where(&job, "job_nr = ?", jobRequest.JobNr).Count(&jobCount)

	if jobCount > 0 {
		return 0, errors.New("job already exists")
	}

	job.Name = jobRequest.Name
	job.JobNr = jobRequest.JobNr

	result := db.Create(&job)
	if result.Error != nil {
		logger.S().Errorf("Could not create Job with name: %s, Error:%v", job.Name, result.Error)
		return 0, result.Error
	}

	return job.ID, nil
}
