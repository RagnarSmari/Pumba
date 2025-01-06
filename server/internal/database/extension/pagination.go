package extension

import (
	"gorm.io/gorm"
	"server/pkg"
)

func Paginate(pagination *pkg.Pagination) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {

		if pagination.Page <= 0 {
			pagination.Page = 1
		}

		// Only support pageSize from 10 to 100
		if pagination.PageSize > 100 {
			pagination.PageSize = 100
		} else if pagination.PageSize <= 0 {
			pagination.PageSize = 10
		}
		offset := (pagination.Page - 1) * pagination.PageSize

		if pagination.OrderByColumn != "" && pagination.OrderByDirection != "" {
			db.Order(pagination.OrderByColumn + " " + pagination.OrderByDirection)
		}
		return db.Offset(offset).Limit(pagination.PageSize)
	}
}
