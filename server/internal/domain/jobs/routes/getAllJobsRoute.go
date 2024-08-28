package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
)

func GetAllJobsRoute(c *gin.Context) {

	// Call the handler
	err, jobs := handlers.GetAllJobsHandler(c)

	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusInternalServerError,
			Error:  err.Error(),
		})
	}

	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusOK,
		Data:   jobs,
	})
}
