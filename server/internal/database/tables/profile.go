package tables

import (
	"server/auth"
)

type Profile struct {
	BaseTable
	FirebaseUid string
	Kennitala   *int          `gorm:"uniqueIndex"` // Can be null or if it has value, then it should be unique to every user SSN
	Name        *string       // Can be null since the information is not required per-se
	PhoneNumber *int          // Can be null since the information is not required per-se
	Email       string        // Can be null since the information is not reuqired per-se
	Role        auth.UserRole // We get this information from firebase context
}
