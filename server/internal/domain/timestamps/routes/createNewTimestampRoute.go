package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/timestamps/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

// Creates new timestamp for currently logged in user
func CreateNewTimestampRoute(c *gin.Context) {
	var request dtos.TimestampRequest

	// Bind to a variable
	if err := c.ShouldBindJSON(&request); err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
	}

	// Validate
	err := pkg.Validate.Struct(request)
	if err != nil {
		// Validation error
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
	}

	err = handlers.CreateNewTimestampHandler(c, request)

	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
	}

	// Return
	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusCreated,
	})
}
