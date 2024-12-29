package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/handlers"
	"server/pkg"
	"strconv"
)

func GetTimestampRoute(ctx *gin.Context) (pkg.Response, error) {

	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	timestamp, err := handlers.GetTimeStampHandler(ctx, id)

	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.SendDataResponse(timestamp), nil

}
