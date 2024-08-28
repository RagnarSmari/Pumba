package handlers

import (
	"errors"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"

	"github.com/gin-gonic/gin"
)

func CreateNewTimestampHandler(c *gin.Context, request dtos.TimestampRequest) error {
	var timestamp tables.Timestamp
	var response dtos.TimestampDto

	var userUid, exists = c.Get("user_uid")
	if !exists {
		return errors.New("no user uid")
	}

	db := database.Db.WithContext(c)

	// Apply the info
	timestamp.TotalHours = request.TotalHours
	timestamp.JobId = &request.JobId
	timestamp.UserFirebaseUid = userUid.(string)

	if err := db.Create(&timestamp); err != nil {
		return err.Error
	}

	response.TotalHours = timestamp.TotalHours
	response.Id = timestamp.ID

	return nil
}
