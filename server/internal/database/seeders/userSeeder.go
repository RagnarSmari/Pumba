package seeders

import (
	"context"
	"gorm.io/gorm"
)

func SeedAdminUser(ctx context.Context, db *gorm.DB) {

	//var name = "Ragnar Smári Ómarsson"
	//var firebaseUid = "OISll5KdDgTBpHiXJyqKQYUn7r23"
	//
	//var user = &tables.User{
	//	BaseTable:   tables.BaseTable{},
	//	FirebaseUid: firebaseUid,
	//	Name:        name,
	//}
	//
	//session := db.Session(&gorm.Session{SkipHooks: true})
	//if err := session.Create(&user).Error; err != nil {
	//	logger.S().Fatalf("Failed to seed user: %v", err)
	//}
}
