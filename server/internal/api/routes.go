package api

type ApiRoutes struct {
	ApiPrefix        string
	JobsPrefix       JobRoutes
	TimestampsPrefix TimestampRoutes
	AuthRoutes       AuthRoutes
}

type JobRoutes struct {
	Base string
}

type TimestampRoutes struct {
	Base string
}

type AuthRoutes struct {
	Base string
}

var JobApiRoutes = JobRoutes{
	Base: "/job",
}

var TimestampApiRoutes = TimestampRoutes{
	Base: "/timestamp",
}

var AuthRouts = AuthRoutes{
	Base: "/auth",
}

var ApiRoutesConfig = ApiRoutes{
	ApiPrefix:        "/api",
	JobsPrefix:       JobApiRoutes,
	TimestampsPrefix: TimestampApiRoutes,
}
