package entities

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FireBaseId string
	UserRole   uint
	Profile    *Profile
	Jobs       []Job
	TimeStamps []Timestamp
}
