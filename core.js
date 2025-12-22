require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = 3000;

app.get('/', (req, res) => {
    res.render('index', { userData: null });
});

app.get('/api/user', async (req, res) => {
    try {
        const userResponse = await axios.get('https://randomuser.me/api/');
        const user = userResponse.data.results[0];

        const userData = {
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            profilePicture: user.picture.large,
            age: user.dob.age,
            dob: user.dob.date,
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.number} ${user.location.street.name}`
        };
        res.json(userData);
    } catch (err) {
        res.status(500).json({ error: 'Error when receiving the user.' });
    }
});

app.get('/api/country/:countryName', async (req, res) => {
    const countryName = req.params.countryName;
    try {
        const response = await axios.get(`https://api.countrylayer.com/v2/name/${countryName}?access_key=${process.env.COUNTRY_API_KEY}`);
        const country = response.data[0];

        const countryData = {
            name: country.name,
            capital: country.capital,
            languages: country.languages.map(l => l.name).join(', '),
            currency: country.currencies[0].code,
            flag: country.flag
        };
        res.json(countryData);
    } catch (err) {
        res.status(500).json({ error: 'Error when receiving country data.' });
    }
});

app.get('/api/exchange/:currency', async (req, res) => {
    const currency = req.params.currency;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${currency}`);
        const rates = response.data.conversion_rates;
        const exchangeData = {
            USD: rates.USD,
            KZT: rates.KZT
        };
        res.json(exchangeData);
    } catch (err) {
        res.status(500).json({ error: 'Error when receiving exchange rates.' });
    }
});

app.get('/api/news/:country', async (req, res) => {
    const country = req.params.country;
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${country}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`);
        const articles = response.data.articles.map(a => ({
            title: a.title,
            image: a.urlToImage,
            description: a.description,
            url: a.url
        }));
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: 'Error when receiving news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

