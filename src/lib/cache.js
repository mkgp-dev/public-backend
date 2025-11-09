import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function get(key) {
    const k = await redis.get(key);
    return k ?? null;
}

export async function set(key, value, seconds) {
    return redis.setex(key, seconds, value);
}