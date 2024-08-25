package tables

type Job struct {
	BaseTable
	Name       string
	Timestamps []*Timestamp `gorm:"foreignkey:JobId"`
}
