package routes

import (
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
	"server/auth"
	"server/pkg"
	"server/pkg/dtos"
)

func GetAllUsersRoute(ctx *gin.Context) {
	pagination := pkg.GetPaginationFromUrl(ctx, ctx.Request.URL.String())

	iter, err := auth.GetAllUsers(ctx)

	if err != nil {
		pkg.SendErrorResponse(ctx, 500, err.Error())
		return
	}

	var users []dtos.FireBaseUser
	for {
		userRecord, err := iter.Next()
		if err == iterator.Done {
			break
		} else if err != nil {
			pkg.SendErrorResponse(ctx, 500, err.Error())
			return
		}
		customClaims := userRecord.CustomClaims

		var role auth.UserRole
		if val, ok := customClaims["role"]; ok {
			roleStr := val.(string)
			role, err = auth.ConvertToRole(roleStr)
			if err != nil {
				pkg.SendErrorResponse(ctx, 500, err.Error())
				return
			}
		}
		fbUser := dtos.FireBaseUser{
			UId:   userRecord.UID,
			Email: userRecord.Email,
			Role:  role,
		}
		users = append(users, fbUser)
	}

	response := pkg.PaginationResponse[dtos.FireBaseUser]{
		Page:       pagination.Page,
		PageSize:   pagination.PageSize,
		TotalCount: int64(len(users)),
		Data:       users,
		Error:      "",
	}
	pkg.SendPaginatedResponse(ctx, response)
}
