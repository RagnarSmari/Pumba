package authRoutes

import (
	"github.com/RagnarSmari/Pumba/configs"
	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/RagnarSmari/Pumba/internal/database"
	"github.com/RagnarSmari/Pumba/internal/entities"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type SignUpRequest struct {
	FireBaseId string `json:"fireBaseId"`
	Email      string `json:"email"`
}

type LoginRequest struct {
	IdToken string `json:"id_token"`
}

type LoginResponse struct {
	UerRole string `json:"user_role"`
}

type CurrentUserResponse struct {
	UserRole string `json:"user_role"`
}

type UserByKTRequest struct {
	Email string `json:"email"`
}

func login(c *gin.Context) {
	var loginRequest LoginRequest
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

	c.JSON(http.StatusCreated, gin.H{"status": "success"})
}

func logout(c *gin.Context) {
	c.SetCookie(
		"__session",
		"",
		0,
		"/",
		"",
		true,
		true)
	c.JSON(http.StatusFound, gin.H{"": "success"})
}

func currentUserInformation(c *gin.Context) {
	var user entities.User
	var db = database.GetDB()

	var err = db.Where("fire_base_id = ?", c.Param("fire_base_id")).First(&user).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"err": err.Error()})
		return
	}

	userRole := database.GetUserRoleName(user.UserRole)
	c.JSON(http.StatusOK, gin.H{"UserRole": userRole})
}

func CheckSession(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

func AddPrivateAuthRoutes(router *gin.RouterGroup) {
	apiConfig := configs.ApiRoutesConfig
	router.POST(apiConfig.AuthRoutes.Logout, logout)
	router.GET(apiConfig.AuthRoutes.CurrentUser, currentUserInformation)
	router.GET(apiConfig.AuthRoutes.CheckSession, CheckSession)
}

func AddPublicAuthRoutes(router *gin.RouterGroup) {
	apiConfig := configs.ApiRoutesConfig
	router.POST(apiConfig.AuthRoutes.Login, login)
}
