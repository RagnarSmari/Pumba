package tables

import (
	"time"
)

type Timestamp struct {
	BaseTable
	DurationMinutes int // Duration is stored in total minutes for simplicity
	From            *time.Time
	To              *time.Time
	JobId           *uint
	ProfileId       uint
	Profile         Profile    `gorm:"foreignKey:ProfileId"`
	Job             Job        `gorm:"foreignKey:JobId"`
	Comments        []*Comment `gorm:"foreignkey:TimestampId"`
}
