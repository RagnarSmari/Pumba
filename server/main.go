package main

import (
	"log"

	"github.com/RagnarSmari/Pumba/internal/api"
	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	log.Printf("Starting server...")
	err := godotenv.Load() // This will look for a .env file in the current directory
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	router := gin.Default()

	// Configure the database
	database.Configuration()

	// Configure all the api routes
	api.ConfigureApiRoutes(router)

	// Start the server
	router.Run()

	log.Printf("Server started...")
}
