const express = require('express');
const app = express();
const axios = require('axios').default;
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/weather/:city/:countrycode', async (req, res) => {
  try {
    let weatherResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.countrycode}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    let weatherData = weatherResponse.data;

    let giphyResponse = await axios.get(
      `http://api.giphy.com/v1/gifs/search?q=${weatherData.weather[0].description}&api_key=${process.env.GIPHY_API_KEY}&limit=10`
    );

    let giphyData = giphyResponse.data;

    res.json({
      weatherData: weatherData,
      giphyData: giphyData,
    });
  } catch (error) {
    res.status(404);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
