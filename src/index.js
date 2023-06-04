import './styles.css'
import app from "./app"

window.addEventListener('DOMContentLoaded', function() {
    app.getWeatherData()
    app.searchLocationWeather()
})
