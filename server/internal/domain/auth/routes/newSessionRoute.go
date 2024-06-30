package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/auth/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func NewSessionRoute(c *gin.Context) {
	var request dtos.NewSessionRequest

	// Validate
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
			Error:  []string{"Validation error:\n" + err.Error()},
		})
	}

	err, cookie := handlers.CreateNewSessionHandler(c, request.IdToken)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusInternalServerError,
			Error:  []string{"Failed to create new session\n" + err.Error()},
		})
	}

	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusCreated,
		Data:   cookie,
	})
}
