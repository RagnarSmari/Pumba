package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
)

func GetAllJobsRoute(c *gin.Context) {

	// Support pagination
	pagination := pkg.GetPaginationFromUrl(c, c.Request.URL.String())

	// Call the handler
	err, response := handlers.GetAllJobsHandler(c, pagination)

	if err != nil {
		pkg.SendErrorResponse(c, 404, "Error")
	}

	pkg.SendPaginatedResponse(c, response)
}
