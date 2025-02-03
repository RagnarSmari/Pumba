package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg/dtos"
)

func GetUserByFirebaseUIDHandler(ctx context.Context, firebaseUID string) (dtos.UserClaims, error) {

	var claims dtos.UserClaims
	var profile tables.Profile
	var db = database.Db.WithContext(ctx)

	if err := db.Where("firebase_uid = ?", firebaseUID).First(&profile).Error; err != nil {
		return claims, err
	}
	var name string
	if profile.Name == nil {
		name = ""
	} else {
		name = *profile.Name
	}

	claims = dtos.UserClaims{
		Id:          profile.ID,
		FirebaseUID: profile.FirebaseUid,
		Name:        name,
		Email:       profile.Email,
	}
	return claims, nil
}
