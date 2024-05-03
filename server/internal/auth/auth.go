package auth

import (
	"context"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/RagnarSmari/Pumba/internal/logger"
	"time"
)

var firebaseApp *firebase.App
var firebaseClient *auth.Client
var ClientToken *auth.Token

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

func RetrieveUserByToken(ctx context.Context, idToken string) (*auth.UserRecord, error) {
	return firebaseClient.GetUser(ctx, idToken)
}
