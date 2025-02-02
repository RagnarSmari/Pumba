package pkg

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Response struct {
	Status  int
	Message string
	Error   string
	Data    interface{}
}

func SendDataResponse(data interface{}) Response {
	return Response{
		Status:  http.StatusOK,
		Message: "",
		Error:   "",
		Data:    data,
	}
}

func SendRequestSuccessfulResponse(message string) Response {
	return Response{
		Status:  http.StatusOK,
		Message: message,
		Error:   "",
		Data:    nil,
	}
}
func SendPaginatedResponse[T any](response PaginationResponse[T]) Response {
	return Response{
		Status:  http.StatusOK,
		Message: "",
		Error:   "",
		Data:    response,
	}
}

func EntityCreatedResponse(id uint) Response {
	return Response{
		Status:  http.StatusCreated,
		Message: fmt.Sprintf("Entity created with id: %d", id),
		Error:   "",
		Data:    nil,
	}
}

func BadRequestResponse(err error) Response {
	return Response{
		Status:  http.StatusBadRequest,
		Message: "",
		Error:   err.Error(),
		Data:    nil,
	}
}

func InternalServerResponse(err error) Response {
	return Response{
		Status:  http.StatusInternalServerError,
		Message: "",
		Error:   err.Error(),
		Data:    nil,
	}
}

func EntityNotFoundResponse(err error, id int) Response {
	return Response{
		Status:  http.StatusNotFound,
		Message: "Entity with Id: {id} not found",
		Error:   err.Error(),
		Data:    nil,
	}
}

func SendResponse(c *gin.Context, response Response) {
	responseMap := make(map[string]interface{})

	responseMap["message"] = response.Message
	responseMap["error"] = response.Error
	responseMap["data"] = response.Data
	responseMap["status"] = response.Status

	c.JSON(response.Status, responseMap)

	return
}
