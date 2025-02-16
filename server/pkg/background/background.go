package background

import "server/logger"

type JobFunc func()

func Go(fn func()) {
	go func() {
		defer func() {
			if r := recover(); r != nil {
				logger.S().Error(r)
			}
		}()
		fn()
	}()

}
