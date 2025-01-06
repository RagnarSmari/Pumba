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
	TotalHours   int  `validate:"required,gte=0"`
	TotalMinutes int  `validate:"required,gte=0,lte=59"`
	JobId        uint `validate:"required,gte=0"`
}

type TimeStampDetail struct {
	TimestampDto
	Comments []CommentDto
}
