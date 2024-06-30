package entities

import "gorm.io/gorm"

type Job struct {
	gorm.Model
	Name        string
	FirebaseUID string
	Timestamps  []*Timestamp `gorm:"foreignkey:JobId"`
}
