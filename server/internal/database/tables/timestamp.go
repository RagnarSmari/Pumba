package tables

type Timestamp struct {
	BaseTable
	TotalHours      int
	JobId           *uint
	UserFirebaseUid string
	Job             Job `gorm:"foreignKey:JobId"`
}
