package handlers

import (
	"context"
	"errors"
	"server/internal/database"
	"server/internal/database/entities"
	"server/pkg/dtos"
)

func CreateNewJobHandler(ctx context.Context, jobRequest dtos.PostJobRequest) (error, dtos.JobDto) {
	var jobentity entities.Job
	var jobResponse dtos.JobDto
	var db = database.Db.WithContext(ctx)

	// Check if a job with the same name exists
	db.First(&jobentity, "Name = ?", jobRequest.Name)
	if jobentity.ID == 0 {
		// TODO return nill instead of empty response
		return errors.New("job with same name already exists"), jobResponse
	}

	db.Create(&jobentity)

	jobResponse.Id = jobentity.ID
	jobResponse.Name = jobentity.Name

	return nil, jobResponse
}
