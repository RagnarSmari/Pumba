package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func GetAllJobsHandler(ctx context.Context) (error, []dtos.JobDto) {
	var jobs []tables.Job
	db := database.Db.WithContext(ctx)

	result := db.Find(&jobs)

	if result.Error != nil {
		return result.Error, nil
	}

	var jobDtos []dtos.JobDto
	for _, job := range jobs {
		jobDto := dtos.JobDto{
			Id:   job.ID,
			Name: job.Name,
		}
		jobDtos = append(jobDtos, jobDto)
	}
	return nil, jobDtos
}
