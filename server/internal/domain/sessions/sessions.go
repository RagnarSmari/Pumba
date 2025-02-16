package sessions

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/sessions/routes"
	"server/pkg"
)

func AddSessionRoutes(router *gin.RouterGroup) {
	router.POST("/new", pkg.WrapRouteHandler(routes.CreateNewSessionRoute))
}
