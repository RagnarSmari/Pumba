package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/extension"
	"server/internal/database/tables"
	"server/pkg"
	"server/pkg/dtos"
)

func GetAllJobsHandler(ctx context.Context, pagination *pkg.Pagination) (error, []dtos.JobDto) {

	var jobs []tables.Job
	db := database.Db.WithContext(ctx)

	result := db.Scopes(extension.Paginate(pagination)).Find(&jobs)

	if result.Error != nil {
		return result.Error, nil
	}

	var jobDtos []dtos.JobDto

	for _, job := range jobs {
		jobDto := dtos.JobDto{
			Id:    job.ID,
			Name:  job.Name,
			JobNr: job.JobNr,
		}
		jobDtos = append(jobDtos, jobDto)
	}
	return nil, jobDtos
}
