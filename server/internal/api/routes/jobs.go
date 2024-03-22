package routes

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/gin-gonic/gin"
)

var db *sql.DB

func getAllJobs(c *gin.Context) {
	// Implementation of listing all jobs
	db = database.GetDB()
	if db == nil {
		log.Fatal("Database connection not established")
	}

	rows, err := db.Query(`
		SELECT j.id, j.job_name, SUM(t.total_hours) 
		FROM jobs j 
		INNER JOIN timestamps t ON j.id = t.job_id 
		GROUP BY j.id, j.job_name
	`)

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var jobs = make([]entities.Job, 0)

	for rows.Next() {
		var job entities.Job
		err := rows.Scan(&job.Id, &job.JobName, &job.TotalHours)
		if err != nil {
			log.Fatal(err)
		}
		jobs = append(jobs, job)
	}
	c.JSON(200, jobs)
}

func createNewJob(c *gin.Context) {
	db = database.GetDB()

	if db == nil {
		log.Fatal("Database connection not established")
	}

	var newJob struct {
		JobName string `json:"jobName"`
	}

	log.Printf(newJob.JobName)

	if err := c.ShouldBindJSON(&newJob); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var id int64
	err := db.QueryRow(`
		INSERT INTO jobs (job_name) 
		VALUES ($1) RETURNING Id
	`, newJob.JobName).Scan(&id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": id, "jobName": newJob.JobName})
}

func AddJobRoutes(router *gin.RouterGroup) {

	router.GET("/", getAllJobs)
	router.POST("/", createNewJob)
}
