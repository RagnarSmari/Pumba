package api

import (
	"github.com/RagnarSmari/Pumba/internal/api/routes"
	"github.com/gin-gonic/gin"
)

func ConfigureApiRoutes(router *gin.Engine) {

	apiGroup := router.Group(ApiRoutesConfig.ApiPrefix)

	// This comes as /api/job
	routes.AddJobRoutes(apiGroup.Group(ApiRoutesConfig.JobsPrefix.Base))

	

}
