import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const limit = Number(process.env.RATE_LIMIT);

export const globalLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, '60 s'),
    prefix: 'global:owm'
});

export async function owmUsage() {
    return await globalLimiter.limit('all');
}