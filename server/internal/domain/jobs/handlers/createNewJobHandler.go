package handlers

import (
	"context"
	"net/http"
	"server/internal/database"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewJobHandler(ctx context.Context, jobRequest dtos.PostJobRequest) (pkg.Response, error) {

	var job tables.Job
	var db = database.Db.WithContext(ctx)

	// Check if a job with the same number exists
	db.First(&job, "job_nr = ?", jobRequest.JobNr)

	if job.JobNr == jobRequest.JobNr {
		return pkg.Response{Status: http.StatusConflict, Error: "job with same number already exists"}, nil
	}

	// Check if a job with the same name exists
	db.First(&job, "name = ?", jobRequest.Name)

	if job.Name == jobRequest.Name {
		return pkg.Response{Status: http.StatusConflict, Error: "job with same name already exists"}, nil
	}

	job.Name = jobRequest.Name
	job.JobNr = jobRequest.JobNr

	result := db.Create(&job)
	if result.Error != nil {
		logger.S().Errorf("Could not create Job with name: %s, Error:%v", job.Name, result.Error)
		return pkg.InternalServerErrorResponse(), result.Error
	}

	return pkg.EntityCreatedResponse(job.ID), nil
}
