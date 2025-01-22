package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/extension"
	"server/internal/database/tables"
	logger2 "server/logger"
	"server/pkg"
	"server/pkg/dtos"
	"time"
)

func GetAllTimeStampsHandler(ctx context.Context, pagination *pkg.Pagination, from time.Time, to time.Time) (error, pkg.PaginationResponse[dtos.TimestampDto]) {
	var timeStamps []tables.Timestamp
	db := database.Db.WithContext(ctx)

	var totalCount int64
	query := db.Model(&tables.Timestamp{})
	query.Count(&totalCount)

	if !from.IsZero() {
		query = query.Where("created_at >= ?", from)
	}
	if !to.IsZero() {
		query = query.Where("created_at <= ?", to)
	}

	result := query.Preload("Job").Preload("Comments").Preload("Comments.Profile").Scopes(extension.Paginate(pagination)).Find(&timeStamps)

	if result.Error != nil {
		logger2.S().Errorf(result.Error.Error())
		return result.Error, pkg.PaginationResponse[dtos.TimestampDto]{}
	}

	var timeStampDtos []dtos.TimestampDto
	for _, t := range timeStamps {
		//displayName := ""

		//user, err := auth.GetUserByUid(ctx, t.UserFirebaseUid)
		//if err == nil {
		//	displayName = user.Email
		//}
		hours := t.DurationMinutes / 60
		minutes := t.DurationMinutes % 60
		var comments []dtos.CommentDto
		for _, comment := range t.Comments {
			comments = append(comments, dtos.CommentDto{
				Id:          comment.ID,
				Message:     comment.Message,
				TimestampId: comment.TimestampId,
				Author:      comment.Profile.Name,
			})
		}

		timeStampDtos = append(timeStampDtos, dtos.TimestampDto{
			Id:           t.ID,
			TotalHours:   hours,
			TotalMinutes: minutes,
			JobName:      t.Job.Name,
			//UserName:     displayName,
			CreatedAt: t.CreatedAt.Local(),
			Comments:  comments,
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
