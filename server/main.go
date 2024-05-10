package main

import (
	"context"
	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/gin-contrib/cors"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"time"

	"os"

	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/RagnarSmari/Pumba/internal/routes"
	ginzap "github.com/akath19/gin-zap"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// @title Pumba API doc
// @version 1.0
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
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
	router.Use(cors.New(cors.Config{ // TODO make origin not hard-coded
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

	// Configure authentication service
	auth.SetUpAuthService(context.Background())

	// Configure the database
	database.Configuration(ctx)

	// Configure all the api routes
	routes.ConfigureApiRoutes(router)

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Start the server
	err = router.Run(":" + os.Getenv("SERVER_PORT"))
	if err != nil {
		return
	}
}
