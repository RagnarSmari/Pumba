package tables

import "gorm.io/gorm"

type BaseTable struct {
	gorm.Model
	CreatedBy *string
	DeletedBy *string
}
