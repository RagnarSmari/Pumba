package tables

type Job struct {
	BaseTable
	Name       string
	JobNr      int
	Timestamps []*Timestamp `gorm:"foreignkey:JobId"`
}
