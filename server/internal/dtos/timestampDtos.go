package dtos

type TimestampDto struct {
	Id         uint
	TotalHours int
	Email      string
}

type TimestampRequest struct {
	TotalHours int
	JobId      uint
}
