import Redis from "ioredis"

export const GET = async (req, res) => {
    const redisUrl = process.env.REDIS_URL
    if (!redisUrl) {
        res.status(500).json({ redis: "fail", error: "REDIS_URL env not set" })
        return
    }
    const redis = new Redis(redisUrl)
    try {
        const result = await redis.ping()
        redis.disconnect()
        if (result === "PONG") {
            res.status(200).json({ redis: "ok", status: "healthy ^^" })
        } else {
            res.status(500).json({ redis: "fail", error: "Unexpected redis response" })
        }
    } catch (err) {
        res.status(500).json({ redis: "fail", error: err.message })
    }
}
