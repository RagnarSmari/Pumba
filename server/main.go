package main

import (
	"context"
	"github.com/gin-contrib/cors"
	"time"

	"os"

	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/RagnarSmari/Pumba/internal/routes"
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
	defer func(logFile *os.File) {
		var err = logFile.Close()
		if err != nil {

		}
	}(logFile)

	logger.InitLogger(false, logFile)

	err = godotenv.Load() // This will look for a .env file in the current directory
	if err != nil {
		logger.S().Fatalf("Error loading .env file: %v", err)
	}

	// Initialize the router
	router := gin.New()
	// Enable CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8080", "http://localhost:5173"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Content-Length", "Authorization", "Cache-Control"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Disabling this check
	// [GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
	// Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
	err = router.SetTrustedProxies(nil)
	if err != nil {
		return
	}

	// Add the logger middleware
	router.Use(ginzap.Logger(3*time.Second, logger.Zap))

	router.Use(gin.Recovery())

	// Configure the database
	database.Configuration()

	// Configure authentication service
	auth.SetUpAuthService(context.Background())

	// Configure all the api routes
	routes.ConfigureApiRoutes(router)

	// Start the server
	err = router.Run(":" + os.Getenv("SERVER_PORT"))
	if err != nil {
		return
	}
}
