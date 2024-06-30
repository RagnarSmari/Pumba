package auth

import (
	"github.com/gin-gonic/gin"
	"server/configs"
	"server/internal/domain/auth/routes"
)

func AddPrivateAuthRoutes(router *gin.RouterGroup) {
	apiConfig := configs.ApiRoutesConfig
	router.POST(apiConfig.AuthRoutes.Logout, routes.LogoutRoute)
	router.GET(apiConfig.AuthRoutes.CheckSession, routes.PingRoute)
}

func AddPublicAuthRoutes(router *gin.RouterGroup) {
	apiConfig := configs.ApiRoutesConfig
	router.POST(apiConfig.AuthRoutes.NewSession, routes.NewSessionRoute)
}
