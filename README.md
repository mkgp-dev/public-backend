# public-backend
Designed to securely hide and manage API keys, preventing public exposure on the client side.

> [!WARNING]
> Please **do not use my back-end**, as it uses a **free-tier plan** with limited requests and may easily hit its rate limit.

> [!NOTE]
> This backend will be updated if future [The Odin Project](https://www.theodinproject.com/) assignments require APIs with hidden keys.

## Features
- Deployed on [Vercel](https://vercel.com/) using a serverless architecture for simplicity and scalability
- Uses [Upstash](https://upstash.com/) for caching and rate limiting to optimize API performance

## APIs
- [OpenWeatherMap](https://openweathermap.org/) for weather data

## Local usage
Fork or clone this repository and install the required libraries
```bash
npm install
```
Run the development command (*you may be prompted to link this repository to your Vercel account*)
```bash
npm run dev
```
Modify `sample.env` to your liking and rename it to `.env`

## Deployment
Deploy this project using your own repository or by cloning this one and **configure the necessary environment variables**
