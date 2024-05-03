package entities

import "gorm.io/gorm"

type Profile struct {
	gorm.Model
	UserId          uint
	Kennitala       uint `gorm:"uniqueIndex"`
	FirstName       *string
	LastName        *string
	PhoneNumber     *int64
	PhoneNumberZone *int64
	Address         *string
}
