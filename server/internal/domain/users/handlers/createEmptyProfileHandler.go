package handlers

import (
	"context"
	"server/auth"
	"server/internal/database"
	"server/internal/database/tables"
)

func CreateEmptyProfileHandler(ctx context.Context, userUid string, email string, role auth.UserRole) (uint, error) {
	var profile tables.Profile
	ctx = context.WithValue(ctx, "user_uid", "System")
	var db = database.Db.WithContext(ctx)

	// Set custom claims
	err := auth.SetCustomUserClaims(ctx, role, userUid)
	if err != nil {
		return 0, err
	}

	profile = tables.Profile{
		FirebaseUid: userUid,
		Kennitala:   nil,
		Name:        "Drengur Drengsson",
		PhoneNumber: 1111111,
		Email:       email,
		Role:        role,
	}
	result := db.Create(&profile)
	if result.Error != nil {
		return 0, result.Error
	}
	return profile.ID, nil
}
