package middlewares

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/auth"
	"server/internal/domain/auth/handlers"
	"server/logger"
)

func AddAuthMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {

		cookie, err := c.Cookie("pumbaSession")
		if err != nil {
			// Session cookie is unavailable. Force user to login
			logger.S().Errorf("Cookie not available: %v", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Cookie not available"})
			c.Abort()
			return
		}

		// Verify the session cookie. In this case an additional check is added to
		// if the user's Firebase session was revoked, user deleted/disabled, etc.
		decoded, err := auth.VerifySessionCookieAndCheckRevoked(c.Request.Context(), cookie)
		if err != nil {
			// Session cookie is invalid. Force user to login
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Session cookie not valid"})
			return
		}

		// Get the profile Id and add to context
		claims, err := handlers.GetUserByFirebaseUIDHandler(c, decoded.UID)
		if err != nil {
			logger.S().Errorf("Error getting user by firebase uid: %v", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Error getting user by firebase uid"})
			return
		}

		c.Set("user_role", decoded.Claims)
		c.Set("user_uid", decoded.UID)
		c.Set("user_id", claims.Id)
		c.Set("user_name", claims.Name)
		c.Next()
	}
}

func AddAdminMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, exists := c.Get("user_role")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User role is missing"})
		}

		claimsMap, ok := claims.(map[string]interface{})
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user claims"})
			return
		}

		adminRole, ok := claimsMap["admin"].(bool)
		if !ok || !adminRole {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User role is not admin"})
			return
		}

		c.Next()
	}
}

func AddManagerMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Check if user has admin role
		claims, exists := c.Get("user_role")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User role is missing"})
			return
		}

		claimsMap, ok := claims.(map[string]interface{})
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user claims"})
			return
		}

		adminRole, adminExists := claimsMap["admin"].(bool)
		if adminExists && adminRole {
			// User has admin role, proceed to the next middleware or handler
			c.Next()
			return
		}

		// Check if user has manager role
		managerRole, managerExists := claimsMap["manager"].(bool)
		if !managerExists || !managerRole {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Insufficient permissions"})
			return
		}

		// User has manager role, proceed to the next middleware or handler
		c.Next()
	}
}
