package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewJobRoute(c *gin.Context) {
	var request dtos.PostJobRequest

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
	// Call the handler
	err, newJob := handlers.CreateNewJobHandler(c, request)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusInternalServerError,
			Error:  []string{err.Error()},
		})
	}

	// Return
	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusBadRequest,
		Data:   newJob,
	})
}
