package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/pkg"
)

func PingRoute(c *gin.Context) {
	pkg.SendResponse(c, pkg.Response{
		Status:  http.StatusNoContent,
		Message: "Success",
	})
}
