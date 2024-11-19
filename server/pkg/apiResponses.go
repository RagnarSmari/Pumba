package pkg

import (
	"github.com/gin-gonic/gin"
)

type Response struct {
	Status  int
	Message string
	Error   string
	Data    interface{}
}

func SendPaginatedResponse[T any](ctx *gin.Context, response PaginationResponse[T]) {
	ctx.JSON(200, response)
}

func SendErrorResponse(ctx *gin.Context, status int, message string) {
	ctx.JSON(status, message)
}

func SendResponse(c *gin.Context, response Response) {
	responseMap := make(map[string]interface{})

	if len(response.Message) > 0 {
		responseMap["message"] = response.Message
	}
	if len(response.Error) > 0 {
		responseMap["error"] = response.Error
	}
	if response.Data != nil {
		responseMap["data"] = response.Data
	}

	c.JSON(response.Status, responseMap)
}
