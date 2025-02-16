package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"strconv"
)

func DeleteJobRoute(ctx *gin.Context) (pkg.Response, error) {
	idParam := ctx.Param("id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return handlers.DeleteJobHandler(ctx, id), nil
}
