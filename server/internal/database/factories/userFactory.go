package factories

import "server/internal/database/tables"

func CreateAdmin(firebaseUid string) (user *tables.Profile) {

	return &tables.Profile{
		FirebaseUid: firebaseUid,
	}
}
