package entities

import "github.com/jinzhu/gorm"

// type Timestamp struct {
// 	Id int64
// 	TotalHours int64
// 	JobName string
// 	JobId int64
// }

type Timestamp struct {
	gorm.Model
	TotalHours 	int
	JobId 		uint
}