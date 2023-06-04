function showWeatherData(weatherData) {
    const container = document.querySelector('.container')
    console.log(weatherData)
    const timezone = weatherData.location.tz_id;
    container.innerHTML = '';
    container.innerHTML = `
        <p class="location">${weatherData.location.name}, ${weatherData.location.country}</p>
        <p class="localtime">${localtime(timezone)}</p>
        <div>
            <div>
                <p class="temperature">${weatherData.current.temp_c}<sup>&deg;</sup>C</p>
                <p>Feels Like <b>${weatherData.current.feelslike_c}<sup>&deg;</sup>C</b></p>
            </div>
            <div>
                <img src="https:${weatherData.current.condition.icon}" alt="weather icon">
                <p>${weatherData.current.condition.text}</p>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <p><i class="fa-solid fa-cloud"></i></p>
                    <p>${weatherData.current.cloud}%</p>
                </div>
                <p>Cloudiness</p>
            </div>
            <div>
                <div>
                    <p><i class="fa-solid fa-droplet"></i></p>
                    <p>${weatherData.current.humidity}%</p>
                </div>
                <p>Humidity</p>
            </div>
            <div>
                <div>
                    <p><i class="fa-solid fa-wind"></i></p>
                    <p>${weatherData.current.wind_kph} km/h</p>
                </div>
                <p>Wind Speed</p>
            </div>
            
        </div>
    `
    const localtimeElement = document.querySelector('.localtime')
    intervalHandler.startInterval(timezone, localtimeElement)
}

const intervalHandler = {
    startInterval(timezone, localtimeElement) {
        this.stopInterval();

        this.intervalId = setInterval(() => {
            localtimeElement.textContent = localtime(timezone);
        }, 1000);
    },

    stopInterval() {
        clearInterval(this.intervalId);
    },
};

function localtime(timezoneId) {
    const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: timezoneId
    }
    const currentTime = new Date().toLocaleString('en-US', options);
    return currentTime
}

function errorMessage(message = '') {
    const error = document.querySelector('.errorMessage');
    error.textContent = message
}

export default {
    showWeatherData,
    errorMessage,
}