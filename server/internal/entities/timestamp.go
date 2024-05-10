package entities

import "gorm.io/gorm"

type Timestamp struct {
	gorm.Model
	TotalHours          int
	UserFirebaseUID     string
	JobId               uint
	CreateByFirebaseUid string
	DeleteByFirebaseUid *string
	UpdateByFirebaseUid *string
}
