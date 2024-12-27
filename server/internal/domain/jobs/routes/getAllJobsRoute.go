package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func GetAllJobsRoute(c *gin.Context) (pkg.Response, error) {

	// Support pagination
	pagination := pkg.GetPaginationFromUrl(c, c.Request.URL.String())

	// Call the handler
	err, response := handlers.GetAllJobsHandler(c, pagination)

	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	return pkg.SendPaginatedResponse[dtos.JobDto](response), nil
}
