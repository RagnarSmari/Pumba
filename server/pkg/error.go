package pkg

type CustomError struct {
	Description string
}

func NewError(description string) CustomError {
	return CustomError{
		Description: description,
	}
}

func EntityNotFoundError(entityId int) CustomError {
	return CustomError{
		Description: "Entity with id {entityId} not found",
	}
}

func InvalidBodyRequest() CustomError {
	return CustomError{
		Description: "Invalid request body",
	}
}
