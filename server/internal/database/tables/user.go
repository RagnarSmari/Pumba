package tables

type User struct {
	BaseTable
	FirebaseUID     string
	Kennitala       *uint `gorm:"uniqueIndex"`
	FirstName       *string
	LastName        *string
	PhoneNumber     *int64
	PhoneNumberZone *int64
	Address         *string
}
