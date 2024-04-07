package entities

import (
	"time"
	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	UserId 		uint
	Token 		string
	ExpiresAt 	time.Time
}