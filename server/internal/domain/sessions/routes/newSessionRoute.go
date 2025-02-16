package routes

import (
	"fmt"
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

	userName, exists := c.Get("user_name")
	if !exists {
		logger.S().Warn("User name not found in context")
		userName = "user"
	}

	email, exists := c.Get("email")
	if !exists {
		logger.S().Warn("Email not found in context")
		email = "user@pumba.is"
	}

	// Type assert userName and email to string
	userNameStr, nameOk := userName.(string)
	emailStr, emailOk := email.(string)

	if !nameOk || !emailOk {
		errMsg := "Invalid data type for user_name or email in context"
		logger.S().Error(errMsg)
		return pkg.BadRequestResponse(err), fmt.Errorf(errMsg)
	}

	// Return the constructed UserSessionInfo
	return pkg.DataResponse(dtos.UserSessionInfo{
		Login:  userNameStr,
		Email:  emailStr,
		Avatar: "", // Assuming avatar is optional and left empty for now
	}), nil
}
