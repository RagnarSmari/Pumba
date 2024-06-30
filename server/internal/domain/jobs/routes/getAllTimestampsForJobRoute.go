package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/jobs/handlers"
	"server/pkg"
	"strconv"
)

func GetAllTimestampsForJobRoute(c *gin.Context) {

	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusBadRequest,
			Error:  []string{err.Error()},
		})
	}

	err, timestamps := handlers.GetAllTimestampsForJobHandler(c, id)
	if err != nil {
		pkg.SendResponse(c, pkg.Response{
			Status: http.StatusNotFound,
			Error:  []string{err.Error()},
		})
	}

	pkg.SendResponse(c, pkg.Response{
		Status: http.StatusOK,
		Data:   timestamps,
	})
}
