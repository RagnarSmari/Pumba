package middlewares

import (
	"github.com/RagnarSmari/Pumba/internal/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AddAuthMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// After sign-in, all access-protected sections of the website should check the session cookie
		// and verify it before serving restricted content based on some security rule

		// Get the Id token sent by tthe client
		cookie, err := c.Cookie("__session")
		if err != nil {
			// Session cookie is unavailable. Force user to login
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		// Verify the session cookie. In this case an additional check is added to
		// if the user's Firebase session was revoked, user deleted/disabled, etc.
		decoded, err := auth.VerifySessionCookieAndCheckRevoked(c.Request.Context(), cookie)
		if err != nil {
			// Session cookie is invalid. Force user to login
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		auth.ClientToken = decoded
	}
}
