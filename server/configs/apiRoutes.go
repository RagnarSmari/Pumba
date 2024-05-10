package configs

// Define the struct of the routes

type ApiRoutes struct {
	ApiPrefix        string
	JobsPrefix       JobRoutes
	TimestampsPrefix TimestampRoutes
	SessionRoutes    SessionRoutes
	AuthRoutes       AuthRoutes
}

type AuthRoutes struct {
	Base         string
	NewSession   string
	Logout       string
	SignUp       string
	CurrentUser  string
	CheckSession string
}

type JobRoutes struct {
	Base string
}

type TimestampRoutes struct {
	Base string
}

type SessionRoutes struct {
	Base    string
	Refresh string
}

// Value of the routes

var JobApiRoutes = JobRoutes{
	Base: "/job",
}

var TimestampApiRoutes = TimestampRoutes{
	Base: "/timestamp",
}

var AuthApiRoutes = AuthRoutes{
	Base:         "/auth",
	NewSession:   "/newSession",
	Logout:       "/logout",
	SignUp:       "/signup",
	CurrentUser:  "/me",
	CheckSession: "/sessioncheck",
}

var ApiRoutesConfig = ApiRoutes{
	ApiPrefix:        "/api",
	JobsPrefix:       JobApiRoutes,
	TimestampsPrefix: TimestampApiRoutes,
	AuthRoutes:       AuthApiRoutes,
}
