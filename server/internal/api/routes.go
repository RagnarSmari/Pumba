package api

type ApiRoutes struct {
	ApiPrefix        string
	JobsPrefix       JobRoutes
	TimestampsPrefix TimestampRoutes
}

type JobRoutes struct {
	Base string
}

type TimestampRoutes struct {
	Base string
}

var JobApiRoutes = JobRoutes{
	Base: "/job",
}

var TimestampApiRoutes = TimestampRoutes{
	Base: "/timestamp",
}

var ApiRoutesConfig = ApiRoutes{
	ApiPrefix:        "/api",
	JobsPrefix:       JobApiRoutes,
	TimestampsPrefix: TimestampApiRoutes,
}
