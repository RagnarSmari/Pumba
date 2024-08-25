package handlers

import (
	"context"
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func CreateNewJobHandler(ctx context.Context, jobRequest dtos.PostJobRequest) (error, dtos.JobDto) {
	var job tables.Job
	var jobResponse dtos.JobDto
	var db = database.Db.WithContext(ctx)

	// Check if a job with the same name exists
	db.First(&job, "Name = ?", jobRequest.Name)
	if job.ID == 0 {
		// TODO return nill instead of empty response
		return errors.New("job with same name already exists"), jobResponse
	}

	db.Create(&job)
	jobResponse.Id = job.ID
	jobResponse.Name = job.Name

	return nil, jobResponse
}
