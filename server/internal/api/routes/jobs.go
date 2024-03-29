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

	c.JSON(http.StatusOK, gin.H{"id": id, "jobName": newJob.JobName})
}

func getAllTimestampsForJob(c *gin.Context) {
	db = database.GetDB()
	if db == nil {
		log.Fatal("Database connection not established")
	}

	rows, err := db.Query(`
		SELECT t.*, j.job_name
		FROM timestamps t
		INNER JOIN jobs j ON t.job_id = j.id
		WHERE t.job_id = $1
	`, c.Param("id"))

	if err != nil {
		log.Printf("Could not process query. Error: %v", err)
	}
	defer rows.Close()

	var timestamps = make([]entities.Timestamp, 0)

	for rows.Next() {
		var timestamp entities.Timestamp
		err := rows.Scan(&timestamp.Id, &timestamp.JobId, &timestamp.TotalHours, &timestamp.JobName)
		if err != nil {
			log.Fatal(err)
		}
		timestamps = append(timestamps, timestamp)
	}
	c.JSON(200, timestamps)

}

func getJobById(c *gin.Context) {
	db = database.GetDB()
	if db == nil {
		log.Fatal("Database connection not established")
	}

	rows, err := db.Query(`
		SELECT j.id, j.job_name, SUM(t.total_hours) 
		FROM jobs j 
		INNER JOIN timestamps t ON j.id = t.job_id 
		WHERE j.id = $1
		GROUP BY j.id, j.job_name
	`, c.Param("id"))

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var job entities.Job

	for rows.Next() {
		err := rows.Scan(&job.Id, &job.JobName, &job.TotalHours)
		if err != nil {
			log.Fatal(err)
		}
	}
	c.JSON(200, job)
}

func AddJobRoutes(router *gin.RouterGroup) {

	router.GET("/", getAllJobs)
	router.POST("/", createNewJob)
	router.GET("/:id", getJobById)
	router.GET("/:id/timestamps", getAllTimestampsForJob)
}
