package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/handlers"
	"server/pkg"
	"strconv"
)

func GetTimestampCommentsRoute(ctx *gin.Context) (pkg.Response, error) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}
	response, err := handlers.GetTimestampComments(ctx, id)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}
	return pkg.SendDataResponse(response), nil
}
