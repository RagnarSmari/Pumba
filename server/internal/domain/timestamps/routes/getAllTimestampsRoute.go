package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/timestamps/handlers"
	logger2 "server/logger"
	"server/pkg"
	"time"
)

func GetAllTimeStampsRoute(ctx *gin.Context) {
	// support pagination
	pagination := pkg.GetPaginationFromUrl(ctx, ctx.Request.URL.String())
	from := ctx.Query("from")
	to := ctx.Query("to")

	var fromTime, toTime time.Time
	var err error

	// Parse the 'from' time, if provided
	if from != "" {
		fromTime, err = time.Parse(time.RFC3339, from)
		if err != nil {
			logger2.S().Errorf("Invalid 'from' time format: %v", err)
			pkg.SendErrorResponse(ctx, 400, "Invalid 'from' time format")
			return
		}
	}

	// Parse the 'to' time, if provided
	if to != "" {
		toTime, err = time.Parse(time.RFC3339, to)
		if err != nil {
			logger2.S().Errorf("Invalid 'to' time format: %v", err)
			pkg.SendErrorResponse(ctx, 400, "Invalid 'to' time format")
			return
		}
	}

	// Ensure 'to' time is not before 'from' time
	if !fromTime.IsZero() && !toTime.IsZero() && toTime.Before(fromTime) {
		logger2.S().Errorf("'to' time cannot be before 'from' time")
		pkg.SendErrorResponse(ctx, 400, "'to' time cannot be before 'from' time")
		return
	}

	err, response := handlers.GetAllTimeStampsHandler(ctx, pagination, fromTime, toTime)

	if err != nil {
		logger2.S().Errorf(err.Error())
		pkg.SendErrorResponse(ctx, 404, err.Error())
	}

	pkg.SendPaginatedResponse(ctx, response)

}
