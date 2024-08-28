package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
)

func CheckIfUserExistsHandler(ctx context.Context, userUid string) (error, bool) {
	var user tables.User
	var db = database.Db.WithContext(ctx)
	err := db.Where("firebase_uid = ?", userUid).First(&user).Error
	if err != nil {
		return err, false
	}
	return nil, true

}
