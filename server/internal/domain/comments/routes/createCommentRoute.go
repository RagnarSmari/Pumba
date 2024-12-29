package routes

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/comments/handlers"
	"server/pkg"
	"server/pkg/dtos"
)

func CreateNewCommentRoute(ctx *gin.Context) (pkg.Response, error) {
	var request dtos.PostCommentRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		return pkg.BadRequestResponse(err), err
	}

	err := pkg.Validate.Struct(request)
	if err != nil {
		return pkg.BadRequestResponse(err), err
	}

	id, err := handlers.CreateCommentHandler(ctx, request)

	if err != nil {
		return pkg.BadRequestResponse(err), err
	}
	return pkg.EntityCreatedResponse(id), nil
}
