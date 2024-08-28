package auth

import (
	"context"
	"os"
	"server/logger"
	"time"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

var firebaseApp *firebase.App
var firebaseClient *auth.Client

func SetUpAuthService(context context.Context) {
	filePath := os.Getenv("FIREBASE_SERVICE_FILE")
	opt := option.WithCredentialsFile(filePath)
	app, err := firebase.NewApp(context, nil, opt)
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

func VerifyIdToken(context context.Context, idToken string) (*auth.Token, error) {
	return firebaseClient.VerifyIDToken(context, idToken)

}

func CreateUser(ctx context.Context, email string, password string, displayName string) (*auth.UserRecord, error) {
	params := (&auth.UserToCreate{}).
		Email(email).EmailVerified(false).
		Password(password).
		DisplayName(displayName).
		Disabled(false)
	return firebaseClient.CreateUser(ctx, params)
}

func SetCustomUserClaims(ctx context.Context, role UserRole, uid string) error {
	// Check if the user role exists
	claims := map[string]interface{}{role.String(): true}
	return firebaseClient.SetCustomUserClaims(ctx, uid, claims)
}

func GetUserByEmail(ctx context.Context, email string) (*auth.UserRecord, error) {
	return firebaseClient.GetUserByEmail(ctx, email)
}

func GetUserByUid(ctx context.Context, uid string) (*auth.UserRecord, error) {
	return firebaseClient.GetUser(ctx, uid)
}
