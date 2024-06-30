package handlers

import (
	"github.com/gin-gonic/gin"
	"server/auth"
	"server/logger"
	"time"
)

func CreateNewSessionHandler(c *gin.Context, token string) (error, string) {

	// Set session expiration to 5 days
	expiresIn := time.Hour * 24 * 5

	// Create the session cookie. This will also verify the IdToken in the process
	// The session cookie will have the same claims as the token.
	// To only allow session cookie setting on recent sign-in, auth_time in token
	// can be checked to ensure user was recently signed in before creating a session cookie.
	cookie, err := auth.CreateSessionCookie(c.Request.Context(), token, expiresIn)
	if err != nil {
		logger.S().Errorf(err.Error(), "Failed to create a session cookie")
		return err, ""
	}

	// Set cookie policy for session cookie.
	//c.SetSameSite(http.SameSiteNoneMode)
	//c.SetCookie(
	//	"__session",
	//	cookie,
	//	int(expiresIn.Seconds()),
	//	"/",
	//	"",
	//	true,
	//	true)
	return nil, cookie
}
