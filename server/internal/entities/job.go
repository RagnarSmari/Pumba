package entities

import "gorm.io/gorm"

type Job struct {
	gorm.Model
	Name       string       "json:\"name\"" //`gorm:\"unique;not null\""
	Timestamps []*Timestamp `gorm:"foreignkey:JobId"`
	UserID     uint
}
