package dtos

type JobDto struct {
	Id    uint
	Name  string
	JobNr int
}

type PostJobRequest struct {
	Name  string `validate:"required,min=3"`
	JobNr int    `validate:"required,min=1"`
}
