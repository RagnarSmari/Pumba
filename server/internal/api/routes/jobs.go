package routes

import (
	"database/sql"
	"log"

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

	rows, err := db.Query("SELECT id, title, description FROM jobs")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

	var jobs []entities.Job
	for rows.Next() {
        var job entities.Job
        err := rows.Scan(&job.Id, &job.JobName, &job.TotalHours)
        if err != nil {
            log.Fatal(err)
        }
        jobs = append(jobs, job)
    }


}

func createNewJob(c *gin.Context) {
	// Creates a new job
}

func AddJobRoutes(router *gin.RouterGroup) {

	router.GET("/", getAllJobs)
	router.POST("/", createNewJob)
}
