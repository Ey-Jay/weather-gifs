import './styles.css';
import axios from 'axios';

//get weather data & gifs
const fetchbutton = document.getElementById('fetchbutton');
let city;
let countryCode;
let weatherDescription;
let temperature;
let gifs;

fetchbutton.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('spinner').classList.remove('hidden');
  document.getElementById('weatherBlock').classList.add('hidden');
  document.getElementById('gifs').classList.add('hidden');
  let errorMessageBlock = document.getElementById('error-message');
  if (errorMessageBlock) {
    document.getElementById('weatherSection').removeChild(errorMessageBlock);
  }

  city = document.getElementById('citydata').value;
  countryCode = document.getElementById('countrydata').value;

  axios
    .get(`/weather/${city}/${countryCode}`)
    .then((response) => {
      weatherDescription = response.data.weatherData.weather[0].description;
      temperature = response.data.weatherData.main.temp;
      gifs = response.data.giphyData.data;
      displayWeatherData(city, countryCode, weatherDescription, temperature);
      displayGifs();
    })
    .catch((error) => {
      console.log(error);
      document.getElementById('spinner').classList.add('hidden');
      let errorMessage = document.createElement('h1');
      errorMessage.id = 'error-message';
      errorMessage.classList.add(
        'text-3xl',
        'text-red-400',
        'uppercase',
        'p-8',
        'bg-grey-300',
        'shadow-2xl'
      );
      errorMessage.innerText = 'Location not Found';
      document.getElementById('weatherSection').appendChild(errorMessage);
    });
});

//function to display weather data
function displayWeatherData(
  city,
  countryCode,
  weatherDescription,
  temperature
) {
  document.getElementById('spinner').classList.add('hidden');
  const cityCountryCurrentEl = document.getElementById('city-country-current');
  const weatherDescriptionEl = document.getElementById('weather-description');
  const temperatureEl = document.getElementById('temperature');

  cityCountryCurrentEl.innerText = `Current weather for ${city.toUpperCase()}, ${countryCode.toUpperCase()}`;
  weatherDescriptionEl.innerText = `${weatherDescription}`;
  temperatureEl.innerText = `${Math.round(temperature)}\u2103`;
  document.getElementById('weatherBlock').classList.remove('hidden');
}

//function to display GIFS
function displayGifs() {
  const imagesContainer = document.getElementById('images-container');
  document.getElementById('gifs').classList.remove('hidden');
  imagesContainer.innerHTML = '';
  for (let obj of gifs) {
    let img = document.createElement('img');
    img.src = obj.images.downsized.url;
    img.classList.add('m-2', 'h-48', 'rounded', 'shadow-2xl');
    imagesContainer.appendChild(img);
    document.getElementById('gifs').classList.remove('hidden');
  }
}
