package auth

import (
	"fmt"
)

type Role struct {
	Name  string
	Value uint
}

const (
	UserRoleValue    = 1
	AdminRoleValue   = 2
	ManagerRoleValue = 3
)

var (
	UserRole    = Role{Name: "user", Value: UserRoleValue}
	AdminRole   = Role{Name: "admin", Value: AdminRoleValue}
	ManagerRole = Role{Name: "manager", Value: ManagerRoleValue}
)

var UserRoles = []Role{UserRole, AdminRole, ManagerRole}

func RoleExists(role string) bool {
	for _, r := range UserRoles {
		if r.Name == role {
			return true
		}
	}
	return false
}

func NewUserRole(role string) (string, error) {
	if !RoleExists(role) {
		// TODO Use logger instead
		return "", fmt.Errorf("Invalid role: %s", role)
	}
	return role, nil
}
