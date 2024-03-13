package entities

import (
	"time"
)

type Job struct {
	ID int64
	Username string
	Email string
	CreatedAt time.Time
	UpdatedAt time.Time
}