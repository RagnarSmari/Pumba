package jobs

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/jobs/routes"
)

func AddJobRoutes(router *gin.RouterGroup) {
	router.GET("/", routes.GetAllJobsRoute)
	router.POST("/", routes.CreateNewJobRoute)
	router.GET("/:id", routes.GetJobByIdRoute)
	router.GET("/:id/timestamps", routes.GetAllTimestampsForJobRoute)
}
