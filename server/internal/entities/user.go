package entities

import "github.com/jinzhu/gorm"

// type User struct {
// 	ID       string `json:"id"`
// 	Email    string `json:"email"`
// 	Password string `json:"password"`
// }


type User struct {
	gorm.Model
	FireBaseId	string
	Email		string
	Sessions	[]*Session
	Profile		*Profile
}