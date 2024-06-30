package pkg

import (
	"github.com/go-playground/validator/v10"
	"server/logger"
)

var Validate *validator.Validate

func InitializeValidator() {
	logger.S().Info("Initializing validator")
	Validate = validator.New(validator.WithRequiredStructEnabled())
}
