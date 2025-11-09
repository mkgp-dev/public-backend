import { corsModify } from "../../src/lib/cors.js";
import { get, set } from "../../src/lib/cache.js";
import { owmUsage } from "../../src/lib/limiter.js";
import { openWeatherMap } from "../../src/openweathermap.js";

export default async function handler(req, res) {
    corsModify(res);

    try {
        const { q, units = 'metric' } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'q cannot be empty' });
        }

        const cacheName = `owm:weather:${q}`;
        const cacheData = await get(cacheName);
        if (cacheData) return res.status(200).json({ cache: true, data: cacheData });

        const consumption = await owmUsage();
        res.setHeader('X-GlobalLimit', consumption.limit);
        res.setHeader('X-GlobalRemaining', consumption.remaining);
        if (!consumption.success) {
            return res.status(429).json({ error: 'Limit reached. Try again after a minute' });
        }

        const params = { q, units };
        const { data } = await openWeatherMap('weather', params);

        await set(cacheName, data, 60);
        res.status(200).json({ cache: false, data });
    } catch(error) {
        const status = error.response?.status ?? 502;
        if (status === 429) {
            const retry = error.response?.headers?.['retry-after'];
            res.setHeader('Retry-After', retry);
        }

        res.status(status).json({ error: error.response?.data ?? error.message ?? "Upstream error." });
    }
}