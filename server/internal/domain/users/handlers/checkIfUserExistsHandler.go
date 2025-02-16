package handlers

import (
	"context"
	"gorm.io/gorm"
	"server/internal/database"
	"server/internal/database/tables"
)

func CheckIfUserExistsHandler(ctx context.Context, userUid string) (error, bool) {
	var user tables.Profile
	var db = database.Db.WithContext(ctx)
	err := db.Where("firebase_uid = ?", userUid).First(&user).Error

	if err == gorm.ErrRecordNotFound {
		return nil, false
	}

	if err != nil {
		return err, false
	}

	return nil, true
}
