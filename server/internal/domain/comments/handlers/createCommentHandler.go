package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg/dtos"
)

func CreateCommentHandler(ctx context.Context, request dtos.PostCommentRequest) (uint, error) {
	var comment tables.Comment
	var db = database.Db.WithContext(ctx)

	// Check if a timestamp with that Id exists or not
	var timestamp tables.Timestamp
	if err := db.First(&timestamp, request.TimeStampId).Error; err != nil {
		return 0, err
	}

	comment.Message = request.Message
	comment.TimestampId = uint(request.TimeStampId)

	err := db.Create(&comment)
	if err != nil {
		logger.S().Errorf("Could not create comment with properties -> Name: %s, TimestampId: %s, Error:%s", request.Message, request.TimeStampId, err)
		return 0, err.Error
	}

	return comment.ID, nil

}
