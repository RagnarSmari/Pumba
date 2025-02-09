package extension

import (
	"gorm.io/gorm"
	"regexp"
	"server/logger"
	"server/pkg"
	"strings"
)

func Paginate(pagination *pkg.Pagination) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {

		if pagination.PageSize == -1 && pagination.Page == -1 {
			return db
		}

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
			logger.S().Infof("Order by column: %s, direction: %s", stringToLowerSnakeCase(pagination.OrderByColumn), pagination.OrderByDirection)
			db.Order(stringToLowerSnakeCase(pagination.OrderByColumn) + " " + strings.ToLower(pagination.OrderByDirection))
		}

		return db.Offset(offset).Limit(pagination.PageSize)
	}
}

func stringToLowerSnakeCase(val string) string {
	// Replace spaces or special characters with underscores
	reg := regexp.MustCompile(`[^\w]+`)
	val = reg.ReplaceAllString(val, "_")

	// Convert from camelCase to snake_case
	val = regexp.MustCompile(`([a-z0-9])([A-Z])`).ReplaceAllString(val, "${1}_${2}")

	// Convert to lowercase
	return strings.ToLower(val)
}
