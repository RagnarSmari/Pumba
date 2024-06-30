package auth

import (
	"context"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"server/logger"
	"time"
)

var firebaseApp *firebase.App
var firebaseClient *auth.Client

func SetUpAuthService(context context.Context) {
	app, err := firebase.NewApp(context, nil)
	if err != nil {
		logger.S().Fatalf("error initializing authentication service: %v\n", err)
	}
	firebaseApp = app
	InitializeAuthService(context)
}

func InitializeAuthService(context context.Context) {
	client, err := firebaseApp.Auth(context)
	if err != nil {
		logger.S().Fatalf("error initializing authentication service: %v\n", err)
	}
	firebaseClient = client
}

func CreateSessionCookie(context context.Context, idToken string, expiresIn time.Duration) (string, error) {
	return firebaseClient.SessionCookie(context, idToken, expiresIn)
}

func VerifySessionCookieAndCheckRevoked(context context.Context, cookieValue string) (*auth.Token, error) {
	return firebaseClient.VerifySessionCookieAndCheckRevoked(context, cookieValue)
}

func CreateUser(ctx context.Context, email string, password string, displayName string) (*auth.UserRecord, error) {
	params := (&auth.UserToCreate{}).
		Email(email).EmailVerified(false).
		Password(password).
		DisplayName(displayName).
		Disabled(false)
	return firebaseClient.CreateUser(ctx, params)
}

func SetCustomUserClaims(ctx context.Context, userRole string, uid string) error {
	// Check if the user role exists
	if !RoleExists(userRole) {
		logger.S().Errorf("user role %s does not exist", userRole)
	}
	claims := map[string]interface{}{userRole: true}
	return firebaseClient.SetCustomUserClaims(ctx, uid, claims)
}

func GetUserByEmail(ctx context.Context, email string) (*auth.UserRecord, error) {
	return firebaseClient.GetUserByEmail(ctx, email)
}

func GetUserByUid(ctx context.Context, uid string) (*auth.UserRecord, error) {
	return firebaseClient.GetUser(ctx, uid)
}
