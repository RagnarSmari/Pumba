package pkg

import (
	"github.com/gin-gonic/gin"
	"server/logger"
)

type RouteHandler func(ctx *gin.Context) (Response, error)

func WrapRouteHandler(handler RouteHandler) gin.HandlerFunc {
	return func(context *gin.Context) {
		response, err := handler(context)
		if err != nil {
			logger.S().Errorf("Error returning from handler", err.Error())
		}
		SendResponse(context, response)
	
	}

}
