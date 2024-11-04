package domain

import (
	"github.com/gin-gonic/gin"
	"server/configs"
	"server/internal/domain/jobs"
	"server/internal/domain/sessions"
	"server/internal/domain/timestamps"
	"server/internal/domain/users"
	"server/internal/middlewares"
	"server/logger"
)

func ConfigureApiRoutes(router *gin.Engine) {

	logger.S().Info("Configuring API routes...")

	apiConfig := configs.ApiRoutesConfig
	apiGroup := router.Group(apiConfig.ApiPrefix)

	configurePublicApiRoutes(apiGroup, apiConfig)
	apiGroup.Use(middlewares.AddAuthMiddleWare())
	{
		configurePrivateApiRoutes(apiGroup, apiConfig)
	}
}

func configurePublicApiRoutes(apiGroup *gin.RouterGroup, apiConfig configs.ApiRoutes) {
	sessions.AddSessionRoutes(apiGroup.Group(apiConfig.SessionRoutes.Base))
}

func configurePrivateApiRoutes(apiGroup *gin.RouterGroup, apiConfig configs.ApiRoutes) {
	timestamps.AddTimestampRoutes(apiGroup.Group(apiConfig.TimestampsPrefix.Base))
	jobs.AddJobRoutes(apiGroup.Group(apiConfig.JobsPrefix.Base))
	users.AddUserRoutes(apiGroup.Group(apiConfig.UserRoutes.Base))
}
