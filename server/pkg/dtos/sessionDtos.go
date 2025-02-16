package dtos

type CreateSessionDto struct {
	IdToken   string
	CsrfToken string
}

type UserSessionInfo struct {
	Login  string
	Email  string
	Avatar string
}
