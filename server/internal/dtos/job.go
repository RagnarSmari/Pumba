package dtos

type JobDto struct {
	Id   uint   `json:"id"`
	Name string `json:"name"`
}

type PostJobRequest struct {
	Name string `json:"name"`
}
