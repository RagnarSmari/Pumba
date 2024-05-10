package entities

import "gorm.io/gorm"

type Job struct {
	gorm.Model
	Name        string "json:\"name\"" //`gorm:\"unique;not null\""
	FirebaseUID string
	Timestamps  []*Timestamp `gorm:"foreignkey:JobId"`
}
