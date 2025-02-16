package users

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/users/routes"
	"server/pkg"
)

func AddUserRoutes(router *gin.RouterGroup) {
	router.POST("/", pkg.WrapRouteHandler(routes.CreateNewUserRoute))
	router.GET("/", pkg.WrapRouteHandler(routes.GetAllUsersRoute))
}
