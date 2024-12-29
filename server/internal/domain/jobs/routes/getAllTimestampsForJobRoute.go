package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"strconv"
)

func GetAllTimestampsForJobRoute(c *gin.Context) (pkg.Response, error) {

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	err, timestamps := handlers.GetAllTimestampsForJobHandler(c, id)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.SendDataResponse(timestamps), nil
}
