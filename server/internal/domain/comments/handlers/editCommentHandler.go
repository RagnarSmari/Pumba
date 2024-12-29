package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
)

func EditCommentHandler(ctx context.Context, message string, id int) (bool, error) {
	var comment tables.Comment
	var db = database.Db.WithContext(ctx)

	if err := db.First(&comment, id).Error; err != nil {
		return false, err
	}

	comment.Message = message
	err := db.Save(&comment)
	if err != nil {
		return false, err.Error
	}

	return true, nil
}
