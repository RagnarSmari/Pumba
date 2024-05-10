package jobs

import (
	"errors"
	"github.com/RagnarSmari/Pumba/internal/dtos"
	"net/http"

	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @Summary Gets all jobs
// @Tags Jobs
// @Produce json
// @Success 200 {array} dtos.JobDto
// @Router /job [get]
func getAllJobs(c *gin.Context) {
	var jobs []entities.Job
	db := database.GetDB()

	result := db.Find(&jobs)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{"error": errors.New("no jobs found")})
		return
	}

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	// Map entities.Job to JobDto
	var jobDtos []dtos.JobDto
	for _, job := range jobs {
		jobDto := dtos.JobDto{
			Id:   job.ID,
			Name: job.Name,
			// Add other fields as needed
		}
		jobDtos = append(jobDtos, jobDto)
	}

	c.JSON(http.StatusOK, jobDtos)
}

// @Summary Creates a new job
// @Schemes
// @Tags Jobs
// @Accept json
// @Produce json
// @Param Job body dtos.PostJobRequest true "Job"
// @Success 201 {object} dtos.JobDto
// @Router /job [post]
func createNewJob(c *gin.Context) {
	var JobRequest dtos.PostJobRequest
	var jobentity entities.Job
	var jobResponse dtos.JobDto

	if err := c.ShouldBindJSON(&JobRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
	jobentity.Name = JobRequest.Name

	db := database.GetDB()
	if err := db.Create(&jobentity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
	}

	jobResponse.Id = jobentity.ID
	jobResponse.Name = jobentity.Name

	c.JSON(http.StatusCreated, jobResponse)
}

// @Summary Gets a job by id
// @Tags Jobs
// @Produce json
// @Param job_id path int true "Job ID"
// @Success 200 {object} dtos.JobDto
// @Router /job/{job_id} [get]
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

	// Map entities.Job to JobDto
	jobDto := dtos.JobDto{
		Id:   job.ID,
		Name: job.Name,
		// Add other fields as needed
	}

	c.JSON(http.StatusOK, jobDto)
}

// @Summary Get all timestamps related to a job
// @Tags Jobs
// @Produce json
// @Param job_id path int true "Job ID"
// @Success 200 {array} dtos.TimestampDto
// @Router /job/{job_id}/timestamps [get]
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

func AddJobRoutes(router *gin.RouterGroup) {

	router.GET("/", getAllJobs)
	router.POST("/", createNewJob)
	router.GET("/:id", getJobById)
	router.GET("/:id/timestamps", getAllTimestampsForJob)
}
