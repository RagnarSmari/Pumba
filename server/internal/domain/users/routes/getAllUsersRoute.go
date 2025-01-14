package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/users/handlers"
	"server/pkg"
)

func GetAllUsersRoute(ctx *gin.Context) (pkg.Response, error) {
	pagination := pkg.GetPaginationFromUrl(ctx, ctx.Request.URL.String())

	users, err := handlers.GetAllUsersHandler(ctx, pagination)

	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.SendPaginatedResponse(users), nil
}
