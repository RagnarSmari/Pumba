package main

import (
	"context"
	"log"
	"os"
	"server/auth"
	"server/internal/database"
	"server/internal/domain"
	"server/logger"
	"server/pkg"
	"time"

	"github.com/gin-contrib/cors"

	ginzap "github.com/akath19/gin-zap"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Ensure the logs directory exists
	err := os.MkdirAll("./logs", os.ModePerm)
	if err != nil {
		log.Fatalf("Failed to create log directory: %v", err)
	}

	// Create the log file
	logFile, err := os.Create("./logs/logs.log")
	if err != nil {
		log.Fatalf("Failed to create log file: %v", err)
	}
	defer func(logFile *os.File) {
		err := logFile.Close()
		if err != nil {
			log.Printf("Failed to close log file: %v", err)
		}
	}(logFile)

	logger.InitLogger(false, logFile)
	logger.S().Info("Initializing server")
	pkg.InitializeValidator()

	err = godotenv.Load() // This will look for a .env file in the current directory
	if err != nil {
		logger.S().Fatalf("Error loading .env file: %v", err)
	}

	// Initialize the router
	router := gin.New()
	// Enable CORS
	router.Use(cors.New(cors.Config{ // TODO make origin not hard-coded
		AllowOriginFunc: func(origin string) bool {
			// Allow requests from your client origin
			return origin == "http://localhost:3030"
		}, AllowMethods:  []string{"PUT", "PATCH", "GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Content-Length", "Authorization", "Cache-Control"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/api/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello world!",
		})
	})

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
	domain.ConfigureApiRoutes(router)

	// Start background jobs
	//background.Go(backgroundJobs.SearchForMissingProfiles(ctx))
	// Start the server
	err = router.Run(":" + os.Getenv("SERVER_PORT"))
	if err != nil {
		return
	}
}
