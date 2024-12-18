package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/extension"
	"server/internal/database/tables"
	logger2 "server/logger"
	"server/pkg"
	"server/pkg/dtos"
)

func GetAllTimeStampsHandler(ctx context.Context, pagination *pkg.Pagination) (error, pkg.PaginationResponse[dtos.TimestampDto]) {
	var timeStamps []tables.Timestamp
	db := database.Db.WithContext(ctx)

	var totalCount int64
	db.Model(&tables.Timestamp{}).Count(&totalCount)

	result := db.Preload("Job").Scopes(extension.Paginate(pagination)).Find(&timeStamps)

	if result.Error != nil {
		logger2.S().Errorf(result.Error.Error())
		return result.Error, pkg.PaginationResponse[dtos.TimestampDto]{}
	}

	var timeStampDtos []dtos.TimestampDto
	for _, t := range timeStamps {
		timeStampDtos = append(timeStampDtos, dtos.TimestampDto{
			Id:         t.ID,
			TotalHours: t.TotalHours,
			JobName:    t.Job.Name,
		})
	}

	return nil, pkg.PaginationResponse[dtos.TimestampDto]{
		Page:       pagination.Page,
		PageSize:   pagination.PageSize,
		TotalCount: totalCount,
		Data:       timeStampDtos,
		Error:      "",
	}

}
