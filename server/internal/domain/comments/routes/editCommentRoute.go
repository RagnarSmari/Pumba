package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/comments/handlers"
	"server/pkg"
	"server/pkg/dtos"
	"strconv"
)

func EditCommentRoute(ctx *gin.Context) (pkg.Response, error) {
	var request dtos.EditCommentRequest

	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}
	if err := ctx.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}

	// Validate
	err = pkg.Validate.Struct(request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	isSuccess, err := handlers.EditCommentHandler(ctx, request.Message, id)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	if !isSuccess {
		return pkg.InternalServerResponse(err), err
	}
	return pkg.SendRequestSuccessfulResponse("Comment successfully edited"), nil
}
