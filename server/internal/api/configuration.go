package api

import (
	"github.com/RagnarSmari/Pumba/internal/api/routes"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/gin-gonic/gin"

	docs "github.com/RagnarSmari/Pumba/docs"
)

func ConfigureApiRoutes(router *gin.Engine) {
	
	logger.S().Info("Configuring API routes...")
	docs.SwaggerInfo.BasePath = "/api"
	apiGroup := router.Group(ApiRoutesConfig.ApiPrefix)

	// This comes as /api/job:
	routes.AddJobRoutes(apiGroup.Group(ApiRoutesConfig.JobsPrefix.Base))
	routes.AddTimestampRoutes(apiGroup.Group(ApiRoutesConfig.TimestampsPrefix.Base))
	
	routes.AddAuthRoutes(apiGroup.Group(ApiRoutesConfig.AuthRoutes.Base))
}
