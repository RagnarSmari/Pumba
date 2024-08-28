package handlers

import (
	"context"
	"errors"
	"server/auth"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func CreateUserHandler(ctx context.Context, newUserRequest dtos.NewUserRequest) (error, dtos.UserDto) {
	var user tables.User
	var userResponse dtos.UserDto
	var db = database.Db.WithContext(ctx)

	// Check if user exists within firebase
	var _, err = auth.GetUserByEmail(ctx, newUserRequest.Email)
	if err == nil {
		return errors.New("user with that email already exists"), dtos.UserDto{}
	}

	// Check if user with same kennitala exists in out database
	var count int64
	db.Model(&tables.User{}).Where("kennitala = ?", newUserRequest.Kennitala).Count(&count)
	if count > 0 {
		return errors.New("user with kennitala already exists"), dtos.UserDto{}
	}

	// Create user first in firebase and add custom claim, then retrieve the uid and create in out database
	firebaseUser, err := auth.CreateUser(
		ctx,
		newUserRequest.Email,
		newUserRequest.Password,
		newUserRequest.Name)

	if err != nil {
		return err, dtos.UserDto{}
	}

	err = auth.SetCustomUserClaims(ctx, newUserRequest.Role, firebaseUser.UID)
	if err != nil {
		return err, dtos.UserDto{}
	}

	user = tables.User{
		FirebaseUid: firebaseUser.UID,
		Kennitala:   newUserRequest.Kennitala,
		Name:        newUserRequest.Name,
		PhoneNumber: &newUserRequest.PhoneNumber,
	}
	result := db.Create(&user)
	if result.Error != nil {
		return result.Error, dtos.UserDto{}
	}
	userResponse = dtos.UserDto{
		Id:          int(user.ID),
		Name:        user.Name,
		Role:        newUserRequest.Role,
		Email:       newUserRequest.Email,
		Kennitala:   newUserRequest.Kennitala,
		PhoneNumber: newUserRequest.PhoneNumber,
	}
	return nil, userResponse
}
