package auth

import "errors"

type UserRole int

const (
	Admin UserRole = iota
	Owner
	Worker
)

// Convert role to string
func (r UserRole) String() string {
	return [...]string{"Admin", "Owner", "Worker"}[r]
}

// Convert string to role
func ConvertToRole(role string) (UserRole, error) {
	switch role {
	case "Admin":
		return Admin, nil
	case "Owner":
		return Owner, nil
	case "Worker":
		return Worker, nil
	default:
		return -1, errors.New("Error converting role: " + role + "role does not exist")
	}
}
