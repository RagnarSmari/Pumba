package handlers

import (
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"

	"github.com/gin-gonic/gin"
)

func CreateNewTimestampHandler(c *gin.Context, request dtos.TimestampRequest) (uint, error) {
	var timestamp tables.Timestamp

	var userUid, exists = c.Get("user_uid")
	if !exists {
		return 0, errors.New("no user uid")
	}

	db := database.Db.WithContext(c)

	// Calculate total duration
	duration := (request.Hours * 60) + request.Minutes

	timestamp.DurationMinutes = duration
	timestamp.JobId = &request.JobId
	timestamp.UserFirebaseUid = userUid.(string)

	err := db.Create(&timestamp)
	if err != nil {
		return 0, err.Error
	}

	return timestamp.ID, nil
}
