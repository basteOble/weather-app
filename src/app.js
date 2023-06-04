import dom from './dom'

async function fetchWeather(location = 'manila') {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=721c875483c04df38db200139230306&q=${location}&aqi=yes`
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            dom.errorMessage('Location not found. Search must be in the form of "City", "City, State" or "City, Country".')
            return null
        }
        const weatherData = await response.json();
        return weatherData
    } catch (error) {
        dom.errorMessage(error)
        return null
    } 
}

function getWeatherData(location) {
    fetchWeather(location)
    .then(response => {
        if (response.error) {
            dom.errorMessage(response.error.message);
        } else {
            dom.errorMessage()
            dom.showWeatherData(response)
        }
    })
}

function searchLocationWeather() {
    const location = document.querySelector('#searchForm');
    location.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.querySelector('#locationInput');
        if (input.value === '') return
        getWeatherData(input.value)
        this.reset()
    }) 
}

export default {
    getWeatherData,
    searchLocationWeather
}