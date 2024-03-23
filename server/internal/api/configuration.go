package api

import (
	"github.com/RagnarSmari/Pumba/internal/api/routes"
	"github.com/gin-gonic/gin"
	"log"
)

func ConfigureApiRoutes(router *gin.Engine) {
	log.Printf("Configuring api routes...")
	apiGroup := router.Group(ApiRoutesConfig.ApiPrefix)

	// This comes as /api/job:
	routes.AddJobRoutes(apiGroup.Group(ApiRoutesConfig.JobsPrefix.Base))
	routes.AddTimestampRoutes(apiGroup.Group(ApiRoutesConfig.TimestampsPrefix.Base))

}
