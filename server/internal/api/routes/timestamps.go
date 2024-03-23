package routes

import (
	"log"
	"net/http"

	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/gin-gonic/gin"
)

func getAllTimeStamps(c *gin.Context) {
	db = database.GetDB()
	if db == nil {
		log.Fatal("Database connection not established")
	}

	rows, err := db.Query(`
		SELECT t.*, j.job_name
		FROM timestamps t
		INNER JOIN jobs j ON t.job_id = j.id
	`)

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

func createNewTimeStamp(c *gin.Context) {
	db = database.GetDB()

	if db == nil {
		log.Fatal("Database connection not established")
	}

	var newTimeStamp struct {
		TotalHours int64 `json:"totalHours"`
		JobId      int64 `json:"jobId"`
	}

	if err := c.ShouldBindJSON(&newTimeStamp); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid input",
		})
		return
	}

	var id int64
	err := db.QueryRow(`
		INSERT INTO timestamps (total_hours, job_id)
		VALUES ($1, $2) RETURNING id
	`, newTimeStamp.TotalHours, newTimeStamp.JobId).Scan(&id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"id":         id,
		"totalHours": newTimeStamp.TotalHours,
	})
}

func AddTimestampRoutes(router *gin.RouterGroup) {

	router.GET("/", getAllTimeStamps)
	router.POST("/", createNewTimeStamp)
}
