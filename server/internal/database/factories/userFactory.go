package factories

import "server/internal/database/tables"

func CreateAdmin(firebaseUid string) (user *tables.User) {

	return &tables.User{
		FirebaseUid: firebaseUid,
	}
}
