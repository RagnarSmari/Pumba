package entities

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FireBaseId	string
	Email		string
	Sessions	[]*Session
	Profile		*Profile
}