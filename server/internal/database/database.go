package database

import (
	"context"
	"fmt"
	"os"
	"server/internal/database/seeders"
	"server/internal/database/tables"
	"server/logger"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	Db *gorm.DB
)

func Configuration(ctx context.Context) {
	configureDatabase(ctx)
	migrate(ctx)
	seedData(ctx)
}

func configureDatabase(ctx context.Context) {
	logger.S().Info("Connecting to database...")

	connectionString := getDatabaseConnectionString()
	dialector := postgres.Open(connectionString)
	var err error

	Db, err = gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		logger.S().Fatal("Failed to connect to database", err)
	}
}

func migrate(ctx context.Context) {

	logger.S().Info("Running migrations...")
	err := Db.WithContext(ctx).AutoMigrate(&tables.Job{}, &tables.Profile{}, &tables.Timestamp{})
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

func seedData(ctx context.Context) {
	seeders.SeedAdminUser(ctx, Db)
}
