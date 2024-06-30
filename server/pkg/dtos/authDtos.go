package dtos

type NewSessionRequest struct {
	IdToken string `validate:"required" json:"id_token"`
}

type NewSessionResponse struct {
	Cookie string `validate:"required" json:"cookie"`
}
