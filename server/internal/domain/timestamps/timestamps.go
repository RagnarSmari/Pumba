package timestamps

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/routes"
	"server/pkg"
)

func AddTimestampRoutes(router *gin.RouterGroup) {
	router.POST("/", pkg.WrapRouteHandler(routes.CreateNewTimestampRoute))
	router.GET("/", pkg.WrapRouteHandler(routes.GetAllTimeStampsRoute))
	router.GET("/:id/comments", pkg.WrapRouteHandler(routes.GetTimestampCommentsRoute))
	router.GET("/:id", pkg.WrapRouteHandler(routes.GetTimestampRoute))
}
