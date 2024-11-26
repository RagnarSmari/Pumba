package tables

import (
	"errors"
	"gorm.io/gorm"
	"time"
)

type BaseTable struct {
	gorm.Model
	CreatedBy     *string
	DeletedBy     *string
	LastUpdated   *time.Time
	LastUpdatedBy *string
}

func (b *BaseTable) BeforeDelete(tx *gorm.DB) (err error) {

	currentUserID := tx.Statement.Context.Value("user_uid").(string)

	tx.Model(b).Updates(map[string]interface{}{
		"DeletedAt":       gorm.DeletedAt{Time: time.Now(), Valid: true},
		"DeletedBy":       currentUserID,
		"LastUpdatedAt":   gorm.DeletedAt{Time: time.Now(), Valid: true},
		"LastUpdatedAtBy": currentUserID,
	})
	return errors.New("record is marked as deleted, not physically removed")
}

func (b *BaseTable) BeforeFind(tx *gorm.DB) (err error) {
	tx.Where("deleted_at IS NULL")
	return nil
}

func (b *BaseTable) BeforeCreate(tx *gorm.DB) (err error) {
	currentUserID := tx.Statement.Context.Value("user_uid").(string)
	tx.Model(b).Updates(map[string]interface{}{
		"CreatedBy": currentUserID,
	})
	return errors.New("Could not mark which user created the entity")
}
