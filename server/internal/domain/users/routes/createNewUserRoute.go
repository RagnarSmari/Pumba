package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/users/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewUserRoute(c *gin.Context) (pkg.Response, error) {
	var request dtos.NewUserRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}

	// Validate
	err := pkg.Validate.Struct(request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	id, err := handlers.CreateUserHandler(c, request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.EntityCreatedResponse(id), nil
}
