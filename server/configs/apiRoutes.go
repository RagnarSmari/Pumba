package configs

// Define the struct of the routes

type ApiRoutes struct {
	ApiPrefix        string
	JobsPrefix       JobRoutes
	TimestampsPrefix TimestampRoutes
	SessionRoutes    SessionRoutes
	UserRoutes       UserRoutes
}

type UserRoutes struct {
	Base string
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

var UserApiRoutes = UserRoutes{
	Base: "/user",
}

var ApiRoutesConfig = ApiRoutes{
	ApiPrefix:        "/api",
	JobsPrefix:       JobApiRoutes,
	TimestampsPrefix: TimestampApiRoutes,
	UserRoutes:       UserApiRoutes,
}
