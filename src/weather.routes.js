const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    const { city } = req.query;

    try {
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    units: "metric",
                    appid: process.env.WEATHER_API_KEY
                }
            }
        );

        const data = response.data;

        res.json({
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
            wind_speed: data.wind.speed,
            coordinates: data.coord,
            country: data.sys.country,
            rain: data.rain?.["3h"] || 0
        });
    } catch (error) {
        console.log("OPENWEATHER ERROR:", error.response?.data || error.message);

        res.status(500).json({
            error: "Weather not available",
            details: error.response?.data
        });
    }
});

module.exports = router;
