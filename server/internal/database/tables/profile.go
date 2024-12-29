package tables

import (
	"server/auth"
)

type Profile struct {
	BaseTable
	FirebaseUid string
	Kennitala   int `gorm:"uniqueIndex"`
	Name        string
	PhoneNumber int
	Email       string
	Role        auth.UserRole
}
