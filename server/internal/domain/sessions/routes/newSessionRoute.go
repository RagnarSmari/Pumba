package routes

import (
	"github.com/gin-gonic/gin"
	"server/auth"
	"server/logger"
	"server/pkg"
	"server/pkg/dtos"
	"time"
)

func CreateNewSessionRoute(c *gin.Context) (pkg.Response, error) {
	var request dtos.CreateSessionDto

	if err := c.ShouldBindJSON(&request); err != nil {
		logger.S().Errorf("Error binding request: %v", err)
		return pkg.BadRequestResponse(err), err
	}

	err := pkg.Validate.Struct(request)
	if err != nil {
		logger.S().Errorf("Error validating request: %v", err)
		return pkg.BadRequestResponse(err), err
	}

	expiresIn := time.Hour * 24 * 5
	cookie, err := auth.CreateSessionCookie(c, request.IdToken, expiresIn)
	if err != nil {
		logger.S().Errorf("Error creating session cookie: %v", err)
		return pkg.BadRequestResponse(err), err
	}
	c.SetCookie("pumbaSession", cookie, int(expiresIn.Seconds()), "/", "", true, true)
	return pkg.SuccessfulResponse("Successfully created session and set cookie"), nil
}
