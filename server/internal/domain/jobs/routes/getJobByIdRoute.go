package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"strconv"
)

func GetJobByIdRoute(c *gin.Context) (pkg.Response, error) {

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	err, job := handlers.GetJobByIdHandler(c, id)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.DataResponse(job), nil
}
