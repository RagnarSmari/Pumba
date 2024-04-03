package entities

import (
	"time"
	"github.com/jinzhu/gorm"
)

type Session struct {
	gorm.Model
	UserId 		uint
	Token 		string
	ExpiresAt 	time.Time
}