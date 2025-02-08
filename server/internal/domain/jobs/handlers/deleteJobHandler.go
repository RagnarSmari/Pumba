package handlers

import (
	"context"
	"server/internal/database"
	"server/internal/database/tables"
	"server/pkg"
)

func DeleteJobHandler(ctx context.Context, id int) pkg.Response {

	var job tables.Job
	var db = database.Db.WithContext(ctx)
	result := db.First(&job, id)

	if result.Error != nil {
		return pkg.EntityNotFoundResponse(id)
	}

	db.Delete(&job)
	db.Save(&job)

	return pkg.Response{
		Status: 200,
		Data:   "Job deleted successfully",
	}
}
