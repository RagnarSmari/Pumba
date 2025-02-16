package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func GetTimestampComments(ctx context.Context, timeStampId int) ([]dtos.CommentDto, error) {
	var response []dtos.CommentDto
	var timeStamp tables.Timestamp
	db := database.Db.WithContext(ctx)

	// Check if the timestamp does exists, join comments and return the comments
	if err := db.Preload("Comments").First(&timeStamp, timeStampId).Error; err != nil {
		return nil, err
	}

	for _, comment := range timeStamp.Comments {

		//user, err := handlers.GetUserByFirebaseUIDHandler(ctx, *comment.CreatedBy)

		//if err != nil {
		//	return nil, err
		//}

		response = append(response, dtos.CommentDto{
			Id:          comment.ID,
			Message:     comment.Message,
			TimestampId: comment.TimestampId,
			//CreatedByUserName:  user.Name,
			//CreatedByUserEmail: user.Email,
		})
	}

	return response, nil
}
