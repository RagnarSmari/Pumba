package users

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/users/routes"
)

func AddUserRoutes(router *gin.RouterGroup) {
	router.POST("/", routes.CreateNewUserRoute)
	router.GET("/", routes.GetAllUsersRoute)
}
