package dtos

import "time"

type TimestampDto struct {
	Id           uint
	TotalHours   int
	TotalMinutes int
	JobName      string
	User         string
	CreatedAt    time.Time
}

type TimestampRequest struct {
	Hours   int  `validate:"required,gte=0"`
	Minutes int  `validate:"required,gte=0,lte=59"`
	JobId   uint `validate:"required,gt=0"`
}

type TimeStampDetail struct {
	TimestampDto
	Comments []CommentDto
}
