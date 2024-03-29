package main

import (
	"time"

	"os"

	"github.com/RagnarSmari/Pumba/internal/api"
	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/logger"
	ginzap "github.com/akath19/gin-zap"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Create or open the log file
	logFile, err := os.Create("logs.log") // replace "log.txt" with your desired log file path
	if err != nil {
		panic(err)
	}
	defer logFile.Close()

	logger.InitLogger(false, logFile)

	err = godotenv.Load() // This will look for a .env file in the current directory
	if err != nil {
		logger.S().Fatalf("Error loading .env file: %v", err)
	}

	// Initialize the router
	router := gin.New()

	// Disabling this check
	// [GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
	// Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
	router.SetTrustedProxies(nil)

	// Add the logger middleware
	router.Use(ginzap.Logger(3*time.Second, logger.Zap))
	router.Use(gin.Recovery())

	// Configure the database
	database.Configuration()

	// Configure all the api routes
	api.ConfigureApiRoutes(router)

	// Start the server
	router.Run(":" + os.Getenv("SERVER_PORT"))
}
