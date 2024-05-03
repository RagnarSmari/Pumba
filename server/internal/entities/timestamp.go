package entities

import "gorm.io/gorm"

type Timestamp struct {
	gorm.Model
	TotalHours int  `json:"totalHours"`
	JobId      uint `json:"jobId"`
	UserID     uint
}
