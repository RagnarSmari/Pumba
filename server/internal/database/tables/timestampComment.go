package tables

type TimestampComment struct {
	BaseTable
	Message     string
	TimestampId uint
	ProfileId   uint
	Timestamp   Timestamp `gorm:"foreignKey:TimestampId"`
	Profile     Profile
}
