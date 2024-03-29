package database

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

var db *sql.DB

func Configuration() {
	runMigrations()
	connectToDatabase()
}

func connectToDatabase() {
	logger.S().Info("Connecting to database...")
	var err error
	connectionString := getDatabaseConnectionString()
	db, err = sql.Open("postgres", connectionString)

	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	logger.S().Info("Successfully connected to database")
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

func GetDB() *sql.DB {
	return db
}

func runMigrations() {

	logger.S().Info("Running migrations...")
	// Get the current working direct

	// Create an absolute path to the migrations directory
	migrationsDir := "file://internal/database/migrations"

	connectionString := buildMigrationConnectionString()

	m, err := migrate.New(
		migrationsDir,
		connectionString,
	)

	if err != nil {
		panic(err)
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		panic(err)
	}

	logger.S().Info("Migrations ran successfully")
}

func buildMigrationConnectionString() string {
	host := os.Getenv("DATABASE_HOST")
	port := os.Getenv("DATABASE_PORT")
	user := os.Getenv("DATABASE_USER")
	password := os.Getenv("DATABASE_USER_PASSW")
	dbName := os.Getenv("DATABASE_NAME")

	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, password, host, port, dbName)
}
