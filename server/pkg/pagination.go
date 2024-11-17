package pkg

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Pagination struct {
	Page     int
	PageSize int
	OrderBy  string
	Filter   string
}

func AddPaginationToQuery(url string, pagination Pagination) string {
	return url +
		fmt.Sprintf("?page=%d&pageSize=%d&orderBy=%s&filter=%s",
			pagination.Page, pagination.PageSize, pagination.OrderBy, pagination.Filter)

}

func GetPaginationFromUrl(ctx *gin.Context, url string) *Pagination {
	page, _ := strconv.Atoi(ctx.Query("page"))
	pageSize, _ := strconv.Atoi(ctx.Query("pageSize"))
	orderBy := ctx.Query("orderBy")
	filter := ctx.Query("filter")

	return &Pagination{
		Page:     page,
		PageSize: pageSize,
		OrderBy:  orderBy,
		Filter:   filter,
	}
}
