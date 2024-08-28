package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/users/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewUserRoute(c *gin.Context) {
	var request dtos.NewUserRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
		return
	}

	// Validate
	err := pkg.Validate.Struct(request)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
		return
	}

	err, newUser := handlers.CreateUserHandler(c, request)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusInternalServerError,
			Error:  err.Error(),
		})
		return
	}

	// Return
	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusCreated,
		Data:   newUser,
	})

}
