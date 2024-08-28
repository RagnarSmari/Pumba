package tables

type User struct {
	BaseTable
	FirebaseUid string
	Kennitala   int `gorm:"uniqueIndex"`
	Name        string
	PhoneNumber *int
}
