package pkg

type CustomError struct {
	Title       string
	Description string
}

func NewError(title string, description string) CustomError {
	return CustomError{
		Title:       title,
		Description: description,
	}
}

func EntityNotFoundError(entityId int) CustomError {
	return CustomError{
		Title:       "Entity Not Found",
		Description: "Entity with id {entityId} not found",
	}
}

func InvalidBodyRequest() CustomError {
	return CustomError{
		Title:       "Invalid Body Request",
		Description: "Invalid request body",
	}
}
