# City Dashboard

This is a simple web application that shows weather, news, and currency information for a selected city.  
All external API requests are handled on the backend.

## Features

- Weather information (OpenWeather API)
- City-related news (News API)
- Currency exchange rate to USD
- Simple and clean user interface

## Technologies

- Node.js
- Express.js
- Axios
- dotenv
- HTML, CSS, JavaScript

## Project Structure

2web
├── front
│   ├── index.html
│   ├── style.css
│   └── script.js
├── src
│   ├── weather.routes.js
│   ├── news.routes.js
│   └── currency.routes.js
├── app.js
├── server.js
├── package.json
└── package-lock.json


## API Endpoints

### Weather
GET /api/weather?city=London

### News
GET /api/news?country=London

### Currency
GET /api/currency?currency=GBP

## How to Run

1. Install dependencies:

```bash
npm install
```
2. Create .env with API keys

3. Start the server:

```bash
npx nodemon server.js
```

4. Open in browser:

```
http://localhost:3001
```