package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewJobRoute(c *gin.Context) (pkg.Response, error) {
	var request dtos.PostJobRequest

	// Bind to a variable
	if err := c.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}

	// Validate
	err := pkg.Validate.Struct(request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}
	// Call the handler
	return handlers.CreateNewJobHandler(c, request)
}
