package tables

type Comment struct {
	BaseTable
	Message     string
	TimestampId uint
	Timestamp   Timestamp `gorm:"foreignKey:TimestampId"`
}
