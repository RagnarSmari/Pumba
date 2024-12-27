package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

// CreateNewTimestampRoute Creates new timestamp for currently logged-in user
func CreateNewTimestampRoute(c *gin.Context) (pkg.Response, error) {
	var request dtos.TimestampRequest

	// Bind to a variable
	if err := c.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}

	// Validate
	err := pkg.Validate.Struct(request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	id, err := handlers.CreateNewTimestampHandler(c, request)

	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	// Return
	return pkg.EntityCreatedResponse(id), nil
}
