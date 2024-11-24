package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/users/handlers"
	"server/logger"
	"server/pkg"
)

func GetAllUsersRoute(ctx *gin.Context) {
	pagination := pkg.GetPaginationFromUrl(ctx, ctx.Request.URL.String())

	response, err := handlers.GetAllUsersHandler(ctx, pagination)

	if err != nil {
		logger.S().Errorf(err.Error())
		pkg.SendErrorResponse(ctx, 404, err.Error())
		return
	}

	pkg.SendPaginatedResponse(ctx, response)

}
