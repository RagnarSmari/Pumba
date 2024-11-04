package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/auth"
	"server/pkg"
	"server/pkg/dtos"
	"time"
)

func CreateNewSessionRoute(c *gin.Context) {
	var request dtos.CreateSessionDto

	if err := c.ShouldBindJSON(&request); err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
	}

	err := pkg.Validate.Struct(request)
	if err != nil {
		// Validation error
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
	}

	expiresIn := time.Hour * 24 * 5
	cookie, err := auth.CreateSessionCookie(c, request.IdToken, expiresIn)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		})
	}
	c.SetCookie("pumbaSession", cookie, int(expiresIn.Seconds()), "/", "", true, true)
}
