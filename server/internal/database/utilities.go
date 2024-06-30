package database

import "server/auth"

func GetUserRoleName(RoleValue uint) string {
	var rolename string
	for _, role := range auth.UserRoles {
		if role.Value == RoleValue {
			rolename = role.Name
			break
		}
	}
	return rolename
}
