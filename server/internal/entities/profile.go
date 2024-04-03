package entities

import "github.com/jinzhu/gorm"

type Profile struct {
	gorm.Model
	UserId          uint
	FirstName       *string
	LastName        *string
	PhoneNumber     *int64
	PhoneNumberZone *int64
	Address         *string
}