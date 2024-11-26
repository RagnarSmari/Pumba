package dtos

import (
	"server/auth"
)

type NewUserRequest struct {
	Email       string `validate:"required,email"`
	Name        string `validate:"required,min=3"`
	Role        auth.UserRole
	Password    string `validate:"required,min=8"`
	Kennitala   int    `validate:"required"`
	PhoneNumber int    `validate:"required"`
}

type UserDto struct {
	Id          uint
	Name        string
	Role        auth.UserRole
	Email       string
	Kennitala   int
	PhoneNumber int
}

type FireBaseUser struct {
	UId   string
	Email string
	Role  auth.UserRole
}
