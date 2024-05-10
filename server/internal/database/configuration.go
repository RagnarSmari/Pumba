package database

import (
	"context"
	"fmt"
	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"os"

	"github.com/RagnarSmari/Pumba/internal/logger"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Configuration(ctx context.Context) {
	connectToDatabaseGorm()
	migrate()
	createInitialUser(ctx)
}

func connectToDatabaseGorm() {
	logger.S().Info("Connecting to database...")

	connectionString := getDatabaseConnectionString()
	dialector := postgres.Open(connectionString)
	var err error

	DB, err = gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		logger.S().Fatal("Failed to connect to database", err)
	}
}

func migrate() {
	logger.S().Info("Running migrations...")
	err := DB.AutoMigrate(&entities.Job{}, &entities.Profile{}, &entities.Timestamp{})
	if err != nil {
		logger.S().Fatalf("Failed to run migrations")
	}
	logger.S().Info("Migrations ran successfully")
}

func getDatabaseConnectionString() string {
	host := os.Getenv("DATABASE_HOST")
	port := os.Getenv("DATABASE_PORT")
	user := os.Getenv("DATABASE_USER")
	user_passw := os.Getenv("DATABASE_USER_PASSW")
	db_name := os.Getenv("DATABASE_NAME")

	return fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, user_passw, db_name)
}

func GetDB() *gorm.DB {
	return DB
}

func createInitialUser(ctx context.Context) {
	logger.S().Info("Creating initial user...")
	// First check if he already exists
	_, err := auth.GetUserByEmail(ctx, "raggism98@gmail.com")
	if err == nil {
		// User exists since no error
		logger.S().Info("User already exists")
		return
	}

	c, err := auth.CreateUser(ctx, "raggism98@gmail.com", "LoneWolf5823", "Ragnar")
	if err != nil {
		logger.S().Errorf("Failed to create initial user: %v", err)
	}

	// Add admin privilages
	err = auth.SetCustomUserClaims(ctx, "admin", c.UID)
	if err != nil {
		logger.S().Errorf("Failed to set initial user privilages: %v", err)
	}
	logger.S().Info("Initial user created")

}
