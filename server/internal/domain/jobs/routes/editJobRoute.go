package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"server/pkg/dtos"
	"strconv"
)

func EditJobRoute(c *gin.Context) (pkg.Response, error) {
	idParam := c.Param("id")
	var request dtos.PostJobRequest
	// Bind to a variable
	if err := c.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	newId, err := handlers.EditJobHandler(c, id, request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.EntityUpdatedResponse(newId), nil
}
