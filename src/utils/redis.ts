import Redis from 'ioredis'

function createUseRedis() {
  let redis: Redis

  return async function () {
    if (!redis) {
      redis = new Redis({
        lazyConnect: true,
        ...getRedisConfig(),
      })

      await redis.connect()
    }
    return redis
  }
}

export const useRedis = createUseRedis()

export function getRedisConfig() {
  return {
    host: process.env.NITRO_REDIS_HOST || 'localhost',
    port: Number(process.env.NITRO_REDIS_PORT || 6379),
  }
}
