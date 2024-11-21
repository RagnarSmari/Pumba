package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/handlers"
	logger2 "server/logger"
	"server/pkg"
)

func GetAllTimeStampsRoute(ctx *gin.Context) {
	// support pagination
	pagination := pkg.GetPaginationFromUrl(ctx, ctx.Request.URL.String())

	err, response := handlers.GetAllTimeStampsHandler(ctx, pagination)

	if err != nil {
		logger2.S().Errorf(err.Error())
		pkg.SendErrorResponse(ctx, 404, err.Error())
	}

	pkg.SendPaginatedResponse(ctx, response)

}
