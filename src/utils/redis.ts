export function getRedisConfig() {
    return {
        host: process.env.NITRO_REDIS_HOST || 'localhost',
        port: Number(process.env.NITRO_REDIS_PORT || 6379),
    }
}