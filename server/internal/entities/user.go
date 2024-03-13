package entities

import (
	"time"
	"github.com/google/uuid"
)

// User represents a user in the system.
type User struct {
    ID        uuid.UUID     `json:"id" db:"id"`
    Username  string    `json:"username" db:"username"`
    Email     string    `json:"email" db:"email"`
    CreatedAt time.Time `json:"created_at" db:"created_at"`
    UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
	DeletedBy *uuid.UUID
	DeletedAt *time.Time
}