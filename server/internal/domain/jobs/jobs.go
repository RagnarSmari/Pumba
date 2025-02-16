package jobs

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/routes"
	"server/pkg"
)

func AddJobRoutes(router *gin.RouterGroup) {
	router.GET("/", pkg.WrapRouteHandler(routes.GetAllJobsRoute))
	router.POST("/", pkg.WrapRouteHandler(routes.CreateNewJobRoute))
	router.GET("/:id", pkg.WrapRouteHandler(routes.GetJobByIdRoute))
	router.GET("/:id/timestamps", pkg.WrapRouteHandler(routes.GetAllTimestampsForJobRoute))
	router.PUT("/:id", pkg.WrapRouteHandler(routes.EditJobRoute))
	router.DELETE("/:id", pkg.WrapRouteHandler(routes.DeleteJobRoute))
}
