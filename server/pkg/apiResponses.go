package pkg

import (
	"github.com/gin-gonic/gin"
	"strings"
)

type Response struct {
	Status  int
	Message string
	Error   []string
	Data    interface{}
}

func SendResponse(c *gin.Context, response Response) {
	responseMap := make(map[string]interface{})

	if len(response.Message) > 0 {
		responseMap["message"] = response.Message
	}
	if len(response.Error) > 0 {
		responseMap["error"] = strings.Join(response.Error, "; ")
	}
	if response.Data != nil {
		responseMap["data"] = response.Data
	}

	c.JSON(response.Status, responseMap)
}
