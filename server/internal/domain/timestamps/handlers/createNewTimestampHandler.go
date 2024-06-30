package handlers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/database"
	"server/internal/database/entities"
	"server/pkg/dtos"
)

func CreateNewTimestampHandler(c *gin.Context, request dtos.TimestampRequest) (dtos.TimestampDto, error) {
	var timestamp entities.Timestamp
	var response dtos.TimestampDto
	db := database.Db.WithContext(c)
	uid, exists := c.Get("user_uid")
	if !exists {
		return response, errors.New("no user was marked")
	}

	// Apply the info
	timestamp.TotalHours = request.TotalHours
	timestamp.JobId = request.JobId
	timestamp.UserFirebaseUID = uid.(string)
	timestamp.CreateByFirebaseUid = uid.(string)
	timestamp.DeleteByFirebaseUid = nil
	timestamp.UpdateByFirebaseUid = nil

	if err := db.Create(&timestamp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error})
	}

	response.TotalHours = timestamp.TotalHours
	response.Id = timestamp.ID
	return response, nil

}
