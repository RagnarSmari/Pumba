package sessions

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/sessions/routes"
)

func AddSessionRoutes(router *gin.RouterGroup) {
	router.POST("/new", routes.CreateNewSessionRoute)
}
