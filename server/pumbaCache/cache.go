package pumbaCache

import (
	"github.com/patrickmn/go-cache"
	"server/logger"
	"time"
)

var (
	UserCache *cache.Cache
)

func InitCache(defaultExpiration, cleanupInterval time.Duration) {
	logger.S().Info("Initializing the caching")
	UserCache = cache.New(defaultExpiration, cleanupInterval)
}
