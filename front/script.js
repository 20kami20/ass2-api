async function loadWeatherData() {
  const city = document.getElementById("city").value.trim();
  if (!city) return;

  // WEATHER
  const weatherRes = await fetch(
    `http://localhost:3001/api/weather?city=${city}`
  );
  const weather = await weatherRes.json();

  document.getElementById("weather").innerHTML = `
    <h3>☁️ Weather</h3>
    <p><strong>Temperature:</strong> ${weather.temperature} °C</p>
    <p><strong>Feels like:</strong> ${weather.feels_like} °C</p>
    <p><strong>Description:</strong> ${weather.description}</p>
    <p><strong>Wind:</strong> ${weather.wind_speed} m/s</p>
    <p><strong>Country:</strong> ${weather.country}</p>
  `;

  // NEWS
  const newsRes = await fetch(
    `http://localhost:3001/api/news?country=${city}`
  );
  const news = await newsRes.json();

  document.getElementById("news").innerHTML = `
    <h3>📰 News</h3>
    ${news.map(n => `<div class="news-item">• ${n.title}</div>`).join("")}
  `;

  // CURRENCY
  const currencyCode = weather.country === "GB" ? "GBP" : "USD";
  const currencyRes = await fetch(
    `http://localhost:3001/api/currency?currency=${currencyCode}`
  );
  const currency = await currencyRes.json();

  document.getElementById("currency").innerHTML = `
    <h3>💱 Currency</h3>
    <p><strong>Base:</strong> ${currency.base}</p>
    <p><strong>USD rate:</strong> ${currency.usd_rate}</p>
  `;
}
