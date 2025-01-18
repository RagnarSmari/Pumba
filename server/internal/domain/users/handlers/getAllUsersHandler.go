package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/extension"
	"server/internal/database/tables"
	"server/logger"
	"server/pkg"
	"server/pkg/dtos"
)

func GetAllUsersHandler(ctx context.Context, pagination *pkg.Pagination) (pkg.PaginationResponse[dtos.UserDto], error) {
	var users []tables.Profile

	db := database.Db.WithContext(ctx)
	var totalCount int64
	db.Model(&tables.Profile{}).Count(&totalCount)

	result := db.Scopes(extension.Paginate(pagination)).Find(&users)

	if result.Error != nil {
		logger.S().Errorf(result.Error.Error())
		return pkg.PaginationResponse[dtos.UserDto]{}, result.Error
	}

	var userDtos []dtos.UserDto

	for _, user := range users {
		userDtos = append(userDtos, dtos.UserDto{
			Id:          user.ID,
			Name:        user.Name,
			Role:        user.Role,
			Email:       user.Email,
			Kennitala:   user.Kennitala,
			PhoneNumber: user.PhoneNumber,
		})
	}

	return pkg.PaginationResponse[dtos.UserDto]{
		Page:       pagination.Page,
		PageSize:   pagination.PageSize,
		TotalCount: totalCount,
		Data:       userDtos,
		Error:      "",
	}, nil

}
