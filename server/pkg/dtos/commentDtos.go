package dtos

type CommentDto struct {
	Id                 uint
	Message            string
	TimestampId        uint
	CreatedByUserName  string
	CreatedByUserEmail string
}

type PostCommentRequest struct {
	Message     string `validate:"required,min=1"`
	TimeStampId int    `validate:"required"`
}

type EditCommentRequest struct {
	Message string `validate:"required,min=1"`
}
