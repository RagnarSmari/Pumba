package handlers

import (
	"net/http"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"

	"github.com/gin-gonic/gin"
)

func CreateNewTimestampHandler(c *gin.Context, request dtos.TimestampRequest) (dtos.TimestampDto, error) {
	var timestamp tables.Timestamp
	var response dtos.TimestampDto
	db := database.Db.WithContext(c)

	// Apply the info
	timestamp.TotalHours = request.TotalHours
	timestamp.JobId = request.JobId

	if err := db.Create(&timestamp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error})
	}

	response.TotalHours = timestamp.TotalHours
	response.Id = timestamp.ID
	return response, nil

}
