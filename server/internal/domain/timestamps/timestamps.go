package timestamps

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/routes"
)

func AddTimestampRoutes(router *gin.RouterGroup) {
	router.POST("/", routes.CreateNewTimestampRoute)
}
