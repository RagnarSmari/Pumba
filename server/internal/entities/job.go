package entities

import "github.com/jinzhu/gorm"

// type Job struct {
// 	Id int64
// 	JobName string
// 	TotalHours int64
// }

type Job struct {
	gorm.Model
	Name 		string
	Timestamps 	[]*Timestamp
}