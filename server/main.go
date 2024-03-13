package main

import (
	"github.com/RagnarSmari/Pumba/internal/database"
	"log"
    "github.com/joho/godotenv"
)



func main() {

	
	err := godotenv.Load() // This will look for a .env file in the current directory
    if err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

	// Configure the database
	database.Configuration()
}
