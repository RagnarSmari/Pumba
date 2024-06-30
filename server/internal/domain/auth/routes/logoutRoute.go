package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/pkg"
)

func LogoutRoute(c *gin.Context) {
	c.SetCookie(
		"__session",
		"",
		0,
		"/",
		"",
		true,
		true)

	pkg.SendResponse(c, pkg.Response{
		Status:  http.StatusNoContent,
		Message: "Success",
	})
}
