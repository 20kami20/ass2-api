const express = require("express");
const cors = require("cors");
const path = require("path");

const weatherRoutes = require("./src/weather.routes");
const newsRoutes = require("./src/news.routes");
const currencyRoutes = require("./src/currency.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "front")));

app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/currency", currencyRoutes);

module.exports = app;
