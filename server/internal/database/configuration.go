package database

import (
	"database/sql"
	"fmt"
	"os"

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

	fmt.Println("Successfully connected!")
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

	fmt.Println("Running migrations...")
	// Get the current working directory
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	// Create an absolute path to the migrations directory
	migrationsDir := fmt.Sprintf("file://%s/internal/database/migrations", wd)

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

	fmt.Println("Successfully ran migrations!")
}


func buildMigrationConnectionString() string {
    host := os.Getenv("DATABASE_HOST")
    port := os.Getenv("DATABASE_PORT")
    user := os.Getenv("DATABASE_USER")
    password := os.Getenv("DATABASE_USER_PASSW")
    dbName := os.Getenv("DATABASE_NAME")

    return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, password, host, port, dbName)
}