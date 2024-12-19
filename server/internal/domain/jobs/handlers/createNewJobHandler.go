package handlers

import (
	"context"
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg/dtos"
)

func CreateNewJobHandler(ctx context.Context, jobRequest dtos.PostJobRequest) error {

	var job tables.Job
	var jobResponse dtos.JobDto
	var db = database.Db.WithContext(ctx)

	// Check if a job with the same name exists
	var jobCount int64
	db.Where(&job, "name = ?", jobRequest.Name).Count(&jobCount)

	if jobCount > 0 {
		return errors.New("job already exists")
	}

	job.Name = jobRequest.Name
	job.JobNr = jobRequest.JobNr

	err := db.Create(&job)
	if err != nil {
		logger.S().Errorf("Could not create Job with name: %s, Error:\n%s", job.Name, err.Error)
	}

	jobResponse.Id = job.ID
	jobResponse.Name = job.Name
	jobResponse.JobNr = job.JobNr

	return nil
}
