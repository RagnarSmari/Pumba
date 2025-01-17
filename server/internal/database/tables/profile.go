package tables

import (
	"server/auth"
)

type Profile struct {
	BaseTable
	FirebaseUid string
	Kennitala   *int `gorm:"uniqueIndex"` // Can be null or if it has value, then it should be unique to every user SSN
	Name        string
	PhoneNumber int
	Email       string
	Role        auth.UserRole
}
