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

	db := database.Db.WithContext(c)

	// Calculate total duration
	duration := (request.Hours * 60) + request.Minutes

	profileId, exists := c.Get("user_id")
	if !exists {
		return 0, errors.New("no user id")
	}

	timestamp.DurationMinutes = duration
	timestamp.JobId = &request.JobId
	profileIdUint, ok := profileId.(uint)
	if !ok {
		return 0, errors.New("user_id is not of type uint")
	}
	timestamp.ProfileId = profileIdUint

	err := db.Create(&timestamp)
	if err != nil {
		return 0, err.Error
	}

	return timestamp.ID, nil
}
