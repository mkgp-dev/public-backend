import axios from "axios";

export function owmURL(path, params = {}) {
    const url = new URL(`https://api.openweathermap.org/data/2.5/${path}`);
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && String(value).length) {
            url.searchParams.set(key, value);
        }
    }

    url.searchParams.set('appid', process.env.OPENWEATHER_KEY);
    return url.toString();
}

export async function openWeatherMap(path, params = {}) {
    const url = owmURL(path, params);
    const response = await axios.get(url, { timeout: 10000 });
    return { data: response.data, status: response.status };
}