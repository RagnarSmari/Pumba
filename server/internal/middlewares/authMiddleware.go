package middlewares

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/auth"
	"server/internal/domain/users/handlers"
	"server/logger"
	"server/pkg"
)

func AddAuthMiddleWare() gin.HandlerFunc {
	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			logger.S().Error("No Authorization header")
			pkg.SendResponse(c, pkg.Response{
				Status: http.StatusUnauthorized,
				Error:  "no Authorization header",
			})
			c.Abort()
			return
		}

		idToken := authHeader[len("Bearer "):]
		token, err := auth.VerifyIdToken(c.Request.Context(), idToken)
		if err != nil {
			logger.S().Errorf("Error verifying ID token: %v", err)
			pkg.SendResponse(c, pkg.Response{
				Status: http.StatusUnauthorized,
				Error:  "invalid id token",
			})
			c.Abort()
			return
		}

		uid := token.UID

		// Check if the user exists within our database
		err, doesExist := handlers.CheckIfUserExistsHandler(c.Request.Context(), uid)
		if err != nil || !doesExist {
			pkg.SendResponse(c, pkg.Response{
				Status: http.StatusUnauthorized,
				Error:  "user does not exist",
			})
			return
		}

		c.Set("user_role", token.Claims)
		c.Set("user_uid", uid)
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
