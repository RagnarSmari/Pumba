package backgroundJobs

import (
	"golang.org/x/net/context"
	"google.golang.org/api/iterator"
	"server/auth"
	"server/internal/domain/users/handlers"
	"server/logger"
	"server/pkg/background"
	"time"
)

func SearchForMissingProfiles(ctx context.Context) background.JobFunc {
	return func() {
		t := time.NewTicker(time.Minute) // Run this every 12 hours
		for range t.C {
			logger.S().Infof("Searching for missing profiles")

			iter, err := auth.GetAllUsers(ctx)
			if err != nil {
				logger.S().Errorf("Error getting all users", err.Error())
			}

			for {
				userRecord, err := iter.Next()
				if err == iterator.Done {
					break
				} else if err != nil {
					logger.S().Errorf("Error getting user", err.Error())
					break
				}

				userUid := userRecord.UID
				email := userRecord.Email

				// Search for profile with this uid in our database
				err, exists := handlers.CheckIfUserExistsHandler(ctx, userUid)
				if err != nil {
					logger.S().Errorf("Error checking if user exists", err.Error())
					continue
				}

				if !exists {
					// Create a new profile for this user
					var role auth.UserRole
					if val, ok := userRecord.CustomClaims["role"]; ok {
						roleStr := val.(string)
						role, err = auth.ConvertToRole(roleStr)
						if err != nil {
							logger.S().Errorf("Error converting role", err.Error())
							continue
						}
					}
					profileId, err := handlers.CreateEmptyProfileHandler(ctx, userUid, email, role)
					if err != nil {
						logger.S().Errorf("Error creating profile for user %s with email %s", profileId, email)
						continue
					}
					logger.S().Infof("Created profile for user %s with email %s", profileId, email)
				}
			}

		}
	}
}
