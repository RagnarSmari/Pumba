package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/timestamps/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewTimestampRoute(c *gin.Context) {
	var request dtos.TimestampRequest

	// Bind to a variable
	if err := c.ShouldBindJSON(&request); err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  []string{"Invalid request"},
		})
	}

	// Validate
	err := pkg.Validate.Struct(request)
	if err != nil {
		// Validation error
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  []string{err.Error()},
		})
	}

	newTimestamp, err := handlers.CreateNewTimestampHandler(c, request)

	// Return
	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusBadRequest,
		Data:   newTimestamp,
	})

}
