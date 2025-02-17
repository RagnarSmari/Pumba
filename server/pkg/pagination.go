package pkg

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
	"strings"
)

type Pagination struct {
	Page             int
	PageSize         int
	OrderByColumn    string
	OrderByDirection string
	Filter           string
}

type PaginationResponse[T any] struct {
	Page       int
	PageSize   int
	TotalCount int64
	Data       []T
	Error      string
}

func AddPaginationToQuery(url string, pagination Pagination) string {
	return url +
		fmt.Sprintf("?page=%d&pageSize=%d&orderBy=%s&filter=%s",
			pagination.Page, pagination.PageSize, pagination.OrderByColumn, pagination.Filter)

}

func GetPaginationFromUrl(ctx *gin.Context, url string) *Pagination {
	page, err := strconv.Atoi(ctx.Query("page"))
	if err != nil {
		fmt.Println(err)
		page = -1
	}
	pageSize, err := strconv.Atoi(ctx.Query("pageSize"))
	if err != nil {
		fmt.Println(err)
		pageSize = -1
	}
	orderBy := ctx.Query("orderBy")
	filter := ctx.Query("filter")
	orderResult := strings.Split(orderBy, ":")
	orderByColumn := ""
	orderByDirection := ""
	if len(orderResult) == 2 {
		orderByColumn = orderResult[0]
		orderByDirection = orderResult[1]
	}

	return &Pagination{
		Page:             page,
		PageSize:         pageSize,
		OrderByColumn:    orderByColumn,
		OrderByDirection: orderByDirection,
		Filter:           filter,
	}
}
