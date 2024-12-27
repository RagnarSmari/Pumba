package routes

import (
	"github.com/gin-gonic/gin"
	"server/auth"
	"server/pkg"
	"server/pkg/dtos"
	"time"
)

func CreateNewSessionRoute(c *gin.Context) (pkg.Response, error) {
	var request dtos.CreateSessionDto

	if err := c.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}

	err := pkg.Validate.Struct(request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	expiresIn := time.Hour * 24 * 5
	cookie, err := auth.CreateSessionCookie(c, request.IdToken, expiresIn)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}
	c.SetCookie("pumbaSession", cookie, int(expiresIn.Seconds()), "/", "", true, true)
	return pkg.SendRequestSuccessfulResponse("Successfully created session and set cookie"), nil
}
