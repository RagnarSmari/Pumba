package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/extension"
	"server/internal/database/tables"
	"server/pkg"
	"server/pkg/dtos"
)

func GetAllJobsHandler(ctx context.Context, pagination *pkg.Pagination) (error, pkg.PaginationResponse[dtos.JobDto]) {

	var jobs []tables.Job
	db := database.Db.WithContext(ctx)

	// Get the total count of jobs
	var totalCount int64
	db.Model(&tables.Job{}).Count(&totalCount)

	result := db.Order("id ASC").Scopes(extension.Paginate(pagination)).Find(&jobs)

	if result.Error != nil {
		return result.Error, pkg.PaginationResponse[dtos.JobDto]{}
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
	return nil, pkg.PaginationResponse[dtos.JobDto]{
		Page:       pagination.Page,
		PageSize:   pagination.PageSize,
		TotalCount: totalCount,
		Data:       jobDtos,
		Error:      "",
	}
}
