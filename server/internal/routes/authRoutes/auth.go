package authRoutes

import (
	"github.com/RagnarSmari/Pumba/configs"
	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/RagnarSmari/Pumba/internal/dtos"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// @Summary Creates a new session cookie for that user
// @Description Called after a user has logged in using firebase
// @Description Creates a secure https only cookie for user to use
// @Tags Auth
// @Produce json
// @Param Job body dtos.NewSessionRequest true "Session"
// @Success 201
// @Router /auth/newSession [post]
func newSession(c *gin.Context) {
	var loginRequest dtos.NewSessionRequest
	// Get the token sent by the client
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(400, gin.H{"err": err.Error()})
		return
	}

	// Set session expiration to 5 days
	expiresIn := time.Hour * 24 * 5

	// Create the session cookie. This will also verify the IdToken in the process
	// The session cookie will have the same claims as the token.
	// To only allow session cookie setting on recent sign-in, auth_time in token
	// can be checked to ensure user was recently signed in before creating a session cookie.
	cookie, err := auth.CreateSessionCookie(c.Request.Context(), loginRequest.IdToken, expiresIn)
	if err != nil {
		logger.S().Errorf(err.Error(), "Failed to create a session cookie")
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		return
	}

	// Set cookie policy for session cookie.
	c.SetSameSite(http.SameSiteNoneMode)
	c.SetCookie(
		"__session",
		cookie,
		int(expiresIn.Seconds()),
		"/",
		"",
		true,
		true)

	c.JSON(http.StatusCreated, nil)
}

// @Summary Logs out a user
// @Description Called after a user has logged out using firebase
// @Description Overwrites the existing cookie
// @Tags Auth
// @Produce json
// @Success 204
// @Router /auth/logout [post]
func logout(c *gin.Context) {
	c.SetCookie(
		"__session",
		"",
		0,
		"/",
		"",
		true,
		true)
	c.JSON(http.StatusNoContent, nil)
}

// @Summary Session check
// @Description Checks if session already exists, if user is already logged in
// @Tags Auth
// @Success 204
// @Router /auth/sessioncheck [get]
func CheckSession(c *gin.Context) {
	c.JSON(http.StatusNoContent, nil)
}

func AddPrivateAuthRoutes(router *gin.RouterGroup) {
	apiConfig := configs.ApiRoutesConfig
	router.POST(apiConfig.AuthRoutes.Logout, logout)
	router.GET(apiConfig.AuthRoutes.CheckSession, CheckSession)
}

func AddPublicAuthRoutes(router *gin.RouterGroup) {
	apiConfig := configs.ApiRoutesConfig
	router.POST(apiConfig.AuthRoutes.NewSession, newSession)
}
