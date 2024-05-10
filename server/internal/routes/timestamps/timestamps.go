package timestamps

import (
	"errors"
	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/RagnarSmari/Pumba/internal/dtos"
	"net/http"

	_ "github.com/RagnarSmari/Pumba/docs"
	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @Summary Gets all timestamps
// @Tags Timestamps
// @Produce json
// @Success 200 {array} dtos.TimestampDto
// @Router /timestamp [get]
func getAllTimeStamps(c *gin.Context) {
	var timestamps []entities.Timestamp
	db := database.GetDB()

	result := db.Find(&timestamps)

	if result.Error == gorm.ErrRecordNotFound {
		c.JSON(404, gin.H{"error": errors.New("no timestamps found")})
		return
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	// Map entities.Timestamp to TimestampDto
	var timestampDtos []dtos.TimestampDto
	for _, timestamp := range timestamps {
		timestampDto := dtos.TimestampDto{
			TotalHours: timestamp.TotalHours,
			// Add other fields as needed
		}
		timestampDtos = append(timestampDtos, timestampDto)
	}

	c.JSON(http.StatusOK, timestampDtos)
}

// @Summary Creates a new timestamp
// @Tags Timestamps
// @Produce json
// @Param Timestamp body dtos.TimestampRequest true "Timestamp"
// @Success 200 {object} dtos.TimestampDto
// @Router /timestamp [post]
func createNewTimeStamp(c *gin.Context) {
	var timestamp entities.Timestamp
	var response dtos.TimestampDto
	var request dtos.TimestampRequest
	db := database.GetDB()

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// Get current logged in users Id
	uid, exists := c.Get("user_uid")
	if !exists {
		c.JSON(http.StatusBadRequest, nil)
	}

	// Check if uid exists in firebase
	user, err := auth.GetUserByUid(c.Request.Context(), uid.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
	}
	if user == nil {
		c.JSON(http.StatusUnauthorized, nil)
	}

	// TODO check if job actually exists

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
	response.Email = user.Email

	c.JSON(http.StatusCreated, response)

}

func AddTimestampRoutes(router *gin.RouterGroup) {
	router.GET("/", getAllTimeStamps)
	router.POST("/", createNewTimeStamp)
}
