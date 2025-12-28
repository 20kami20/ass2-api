const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { currency } = req.query;

  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/latest/${currency}`
    );

    res.json({
      base: currency,
      usd_rate: response.data.conversion_rates.USD
    });
  } catch (error) {
    res.status(500).json({ error: "Currency data not available" });
  }
});

module.exports = router;
