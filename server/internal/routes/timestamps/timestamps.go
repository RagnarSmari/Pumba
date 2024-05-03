package timestamps

import (
	"errors"
	"net/http"

	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func getAllTimeStamps(c *gin.Context) {
	var timestamps []entities.Timestamp
	db := database.GetDB()

	result := db.Find(&timestamps)

	if result.Error == gorm.ErrRecordNotFound {
		c.JSON(404, gin.H{"error": errors.New("no timestamps found")})
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, timestamps)
}

func createNewTimeStamp(c *gin.Context) {
	var timestamp entities.Timestamp
	db := database.GetDB()

	c.BindJSON(&timestamp)
	db.Create(&timestamp)

	c.JSON(http.StatusCreated, timestamp)
}

func AddTimestampRoutes(router *gin.RouterGroup) {
	router.GET("/", getAllTimeStamps)
	router.POST("/", createNewTimeStamp)
}
