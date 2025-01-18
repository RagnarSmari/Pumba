package handlers

import (
	"context"
	"errors"
	"server/auth"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func CreateUserHandler(ctx context.Context, newUserRequest dtos.NewUserRequest) (uint, error) {
	var user tables.Profile
	var db = database.Db.WithContext(ctx)

	// Check if user exists within firebase
	var _, err = auth.GetUserByEmail(ctx, newUserRequest.Email)
	if err == nil {
		return 0, errors.New("user with that email already exists")
	}

	// Check if user with same kennitala exists in our database
	var count int64
	db.Model(&tables.Profile{}).Where("kennitala = ?", newUserRequest.Kennitala).Count(&count)
	if count > 0 {
		return 0, errors.New("user with kennitala already exists")
	}

	// Create user first in firebase and add custom claim, then retrieve the uid and create in out database
	firebaseUser, err := auth.CreateUser(
		ctx,
		newUserRequest.Email,
		newUserRequest.Password,
		newUserRequest.Name)

	if err != nil {
		return 0, err
	}

	err = auth.SetCustomUserClaims(ctx, newUserRequest.Role, firebaseUser.UID)
	if err != nil {
		return 0, err
	}

	user = tables.Profile{
		FirebaseUid: firebaseUser.UID,
		Kennitala:   &newUserRequest.Kennitala,
		Name:        &newUserRequest.Name,
		PhoneNumber: &newUserRequest.PhoneNumber,
		Role:        newUserRequest.Role,
	}
	result := db.Create(&user)
	if result.Error != nil {
		return 0, result.Error
	}

	return user.ID, nil
}
