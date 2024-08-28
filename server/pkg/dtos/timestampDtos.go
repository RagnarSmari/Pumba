package dtos

type TimestampDto struct {
	Id         uint
	TotalHours int
	JobName    string
}

type TimestampRequest struct {
	TotalHours int  `validate:"required,gt=0"`
	JobId      uint `validate:"required,gt=0"`
}
