package jobs

import (
	"errors"
	"net/http"

	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func getAllJobs(c *gin.Context) {
	var jobs []entities.Job
	db := database.GetDB()

	result := db.Find(&jobs)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"error": errors.New("no jobs found")})
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, jobs)
}

func createNewJob(c *gin.Context) {
	var job entities.Job
	db := database.GetDB()

	c.BindJSON(&job)
	db.Create(&job)

	c.JSON(http.StatusCreated, job)
}

func getJobById(c *gin.Context) {
	var job entities.Job
	db := database.GetDB()

	id := c.Param("id")
	err := db.First(&job, id).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"error": errors.New("job not found")})
		return
	}

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, job)
}

func getAllTimestampsForJob(c *gin.Context) {
	var timestamps []entities.Timestamp
	db := database.GetDB()

	id := c.Param("id")
	err := db.Where("job_id = ?", id).Find(&timestamps).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"error": errors.New("no timestamps found for job")})
		return
	}

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timestamps)

}

func AddJobRoutes(router *gin.RouterGroup) {

	router.GET("/", getAllJobs)
	router.POST("/", createNewJob)
	router.GET("/:id", getJobById)
	router.GET("/:id/timestamps", getAllTimestampsForJob)
}
