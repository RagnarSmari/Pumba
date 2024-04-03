package database

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/RagnarSmari/Pumba/internal/logger"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *sql.DB
var DB *gorm.DB

func Configuration() {
	// runMigrations()
	// connectToDatabase()
	connectToDatabaseGorm()
	migrate()
}

func connectToDatabaseGorm() {
	logger.S().Info("Connecting to database...")

	connectionString := getDatabaseConnectionString()
	dialector := postgres.Open(connectionString)
	var err error

	DB, err = gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		logger.S().DPanicf("Failed to connect to database", err)
	}
}

func migrate() {
	logger.S().Info("Running migrations...")
	DB.AutoMigrate(&entities.User{})
	DB.AutoMigrate(&entities.Profile{})
	DB.AutoMigrate(&entities.Job{})
	DB.AutoMigrate(&entities.Session{})
	DB.AutoMigrate(&entities.Timestamp{})
	logger.S().Info("Migrations ran successfully")
}

// func connectToDatabase() {
// 	logger.S().Info("Connecting to database...")

// 	var err error
// 	connectionString := getDatabaseConnectionString()
// 	db, err = sql.Open("postgres", connectionString)

// 	if err != nil {
// 		panic(err)
// 	}

// 	err = db.Ping()
// 	if err != nil {
// 		panic(err)
// 	}

// 	logger.S().Info("Successfully connected to database")
// }

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

func GetDB() *sql.DB {
	return db
}

// func runMigrations() {

// 	logger.S().Info("Running migrations...")

// 	// Create an absolute path to the migrations directory
// 	migrationsDir := "file://internal/database/migrations"

// 	connectionString := buildMigrationConnectionString()

// 	m, err := migrate.New(
// 		migrationsDir,
// 		connectionString,
// 	)

// 	if err != nil {
// 		panic(err)
// 	}

// 	err = m.Up()
// 	if err != nil && err != migrate.ErrNoChange {
// 		panic(err)
// 	}

// 	logger.S().Info("Migrations ran successfully")
// }

// func buildMigrationConnectionString() string {
// 	host := os.Getenv("DATABASE_HOST")
// 	port := os.Getenv("DATABASE_PORT")
// 	user := os.Getenv("DATABASE_USER")
// 	password := os.Getenv("DATABASE_USER_PASSW")
// 	dbName := os.Getenv("DATABASE_NAME")

// 	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, password, host, port, dbName)
// }
