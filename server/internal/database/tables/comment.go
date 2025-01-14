package tables

type Comment struct {
	BaseTable
	Message     string
	ProfileId   uint // Author of this comment
	Profile     Profile
	TimestampId uint
	Timestamp   Timestamp `gorm:"foreignKey:TimestampId"`
}
