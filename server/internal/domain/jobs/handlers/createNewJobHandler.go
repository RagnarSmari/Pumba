package handlers

import (
	"context"
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
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

	db.Create(&job)
	jobResponse.Id = job.ID
	jobResponse.Name = job.Name

	return nil
}
