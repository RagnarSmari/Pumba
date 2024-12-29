package pkg

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Response struct {
	Status  int
	Message string
	Error   error
	Data    interface{}
}

func SendDataResponse(data interface{}) Response {
	return Response{
		Status:  http.StatusOK,
		Message: "",
		Error:   nil,
		Data:    data,
	}
}

func SendRequestSuccessfulResponse(message string) Response {
	return Response{
		Status:  http.StatusOK,
		Message: message,
		Error:   nil,
		Data:    nil,
	}
}
func SendPaginatedResponse[T any](response PaginationResponse[T]) Response {
	return Response{
		Status:  http.StatusOK,
		Message: "",
		Error:   nil,
		Data:    response,
	}
}

func EntityCreatedResponse(id uint) Response {
	return Response{
		Status:  http.StatusCreated,
		Message: "Entity with Id {id} successfully created",
		Error:   nil,
		Data:    nil,
	}
}

func BadRequestResponse(err error) Response {
	return Response{
		Status:  http.StatusBadRequest,
		Message: "",
		Error:   err,
		Data:    nil,
	}
}

func InternalServerResponse(err error) Response {
	return Response{
		Status:  http.StatusInternalServerError,
		Message: "",
		Error:   err,
		Data:    nil,
	}
}

func EntityNotFoundResponse(err error, id int) Response {
	return Response{
		Status:  http.StatusNotFound,
		Message: "Entity with Id: {id} not found",
		Error:   err,
		Data:    nil,
	}
}

func SendResponse(c *gin.Context, response Response) {
	responseMap := make(map[string]interface{})

	responseMap["message"] = response.Message
	responseMap["error"] = response.Error
	responseMap["data"] = response.Data

	c.JSON(response.Status, responseMap)

	return
}
