const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { country } = req.query;

  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: country,
          language: "en",
          pageSize: 5,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    res.json(
      response.data.articles.map(article => ({
        title: article.title
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "News not available" });
  }
});

module.exports = router;
