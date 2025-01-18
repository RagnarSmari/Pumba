package dtos

type CommentDto struct {
	Id          uint
	Message     string
	Author      *string // Name of user which is the Author of the comment -- can be null since users name can theoretically be nil
	TimestampId uint
}

type PostCommentRequest struct {
	Message     string `validate:"required,min=1"`
	TimeStampId int    `validate:"required"`
}

type EditCommentRequest struct {
	Message string `validate:"required,min=1"`
}
