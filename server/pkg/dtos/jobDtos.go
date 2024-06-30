package dtos

type JobDto struct {
	Id   uint
	Name string
}

type PostJobRequest struct {
	Name string `validate:"required,min=3"`
}
