package dtos

import "time"

type TimestampDto struct {
	Id           uint
	TotalHours   int
	TotalMinutes int
	JobName      string
	UserName     string
	CreatedAt    time.Time
}

type TimestampRequest struct {
	TotalHours   int  `validate:"required,gt=0"`
	TotalMinutes int  `validate:"required,gt=0"`
	JobId        uint `validate:"required,gt=0"`
}
