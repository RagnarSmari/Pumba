package database

import (
	"database/sql"
	"fmt"
	"os"
	_ "github.com/lib/pq"
)

var db *sql.DB

func Configuration() {

	connectToDatabase()
}

func connectToDatabase() {
	
	var err error
	connectionString := getDatabaseConnectionString();
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

func getDatabaseConnectionString() string{

	host := os.Getenv("DATABASE_HOST");
	port := os.Getenv("DATABASE_PORT");
	user := os.Getenv("DATABASE_USER");
	user_passw := os.Getenv("DATABASE_USER_PASSW");
	db_name := os.Getenv("DATABASE_NAME");

	return fmt.Sprintf("host=%s port=%s user=%s "+
	"password=%s dbname=%s sslmode=disable",
	host, port, user, user_passw, db_name);
}

func GetDB() *sql.DB {
	return db
}
