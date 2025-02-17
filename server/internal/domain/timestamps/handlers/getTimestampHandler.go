package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func GetTimeStampHandler(ctx context.Context, timestampId int) (dtos.TimeStampDetail, error) {
	var response dtos.TimeStampDetail
	var timeStamp tables.Timestamp

	db := database.Db.WithContext(ctx)
	if err := db.Preload("Comments").Preload("Comments.Profile").Preload("Profile").First(&timeStamp, timestampId).Error; err != nil {
		return response, err
	}
	response = dtos.TimeStampDetail{
		TimestampDto: dtos.TimestampDto{
			Id:           timeStamp.ID,
			TotalHours:   timeStamp.DurationMinutes / 60,
			TotalMinutes: timeStamp.DurationMinutes % 60,
			JobName:      timeStamp.Job.Name,
			CreatedAt:    timeStamp.CreatedAt,
		},
		Comments: make([]dtos.CommentDto, len(timeStamp.Comments)),
	}
	for i, comment := range timeStamp.Comments {
		response.Comments[i] = dtos.CommentDto{
			Id:          comment.ID,
			Message:     comment.Message,
			TimestampId: comment.TimestampId,
			Author:      comment.Profile.Name,
		}
	}
	return response, nil

}
