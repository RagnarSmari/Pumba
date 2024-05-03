package auth

type Role struct {
	Name  string
	Value uint
}

const (
	UserRoleValue  = 1
	AdminRoleValue = 2
)

var (
	UserRole  = Role{Name: "User", Value: UserRoleValue}
	AdminRole = Role{Name: "Admin", Value: AdminRoleValue}
)

var UserRoles = []Role{UserRole, AdminRole}
