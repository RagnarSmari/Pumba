package routes

import (
	"github.com/RagnarSmari/Pumba/configs"
	docs "github.com/RagnarSmari/Pumba/docs"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/RagnarSmari/Pumba/internal/middlewares"
	"github.com/RagnarSmari/Pumba/internal/routes/authRoutes"
	"github.com/RagnarSmari/Pumba/internal/routes/jobs"
	"github.com/RagnarSmari/Pumba/internal/routes/timestamps"
	"github.com/gin-gonic/gin"
)

func ConfigureApiRoutes(router *gin.Engine) {

	logger.S().Info("Configuring API routes...")
	docs.SwaggerInfo.BasePath = "/api"

	apiConfig := configs.ApiRoutesConfig
	apiGroup := router.Group(apiConfig.ApiPrefix)

	configurePublicApiRoutes(apiGroup, apiConfig)
	configurePrivateApiRoutes(apiGroup, apiConfig)
}

func configurePublicApiRoutes(apiGroup *gin.RouterGroup, apiConfig configs.ApiRoutes) {
	authRoutes.AddPrivateAuthRoutes(apiGroup.Group(apiConfig.AuthRoutes.Base))
}

func configurePrivateApiRoutes(apiGroup *gin.RouterGroup, apiConfig configs.ApiRoutes) {
	apiGroup.Use(middlewares.AddAuthMiddleWare())
	{
		timestamps.AddTimestampRoutes(apiGroup.Group(apiConfig.TimestampsPrefix.Base))
		jobs.AddJobRoutes(apiGroup.Group(apiConfig.JobsPrefix.Base))
		authRoutes.AddPublicAuthRoutes(apiGroup.Group(apiConfig.AuthRoutes.Base))
	}
}
