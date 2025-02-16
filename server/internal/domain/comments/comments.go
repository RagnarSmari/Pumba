package comments

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/comments/routes"
	"server/pkg"
)

func AddCommentRoutes(router *gin.RouterGroup) {
	router.POST("/", pkg.WrapRouteHandler(routes.CreateNewCommentRoute))
	router.PUT("/:id")
}
