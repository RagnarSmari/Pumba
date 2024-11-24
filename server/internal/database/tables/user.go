package tables

import (
	"server/auth"
)

type User struct {
	BaseTable
	FirebaseUid string
	Kennitala   int `gorm:"uniqueIndex"`
	Name        string
	PhoneNumber int
	Email       string
	Role        auth.UserRole
}
