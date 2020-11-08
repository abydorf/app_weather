import { render, renderIcon, getFormattedDateTime } from './util.js'

const Weather = {

    /**
     * calls openweathermap API via netlify function, renders weather (current or forcast depending on type afterwards)
     * @param {object} currentCityObject current city with name, lat, lon as object
     * @param {string} type endpoint at openweathermap. String must be either "current" to reach "/2.5/weather?foo" or "forecast" for reaching "/2.5/forecast?foo"
     */
    getWeather(currentCityObject, type) {
        fetch(`/.netlify/functions/weather-json/?lat=${currentCityObject.lat}&lon=${currentCityObject.lon}&type=${type}`)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            Weather.saveWeather(data, type)
            Weather.renderWeather(data, type)
        })
    },

    /**
     * renders weather data into HTML
     * @param {JSON} data json reponse or saved weather in local storage
     * @param {string} type string to indicate what to render. Either "current" for current weather or forecast
     */
    renderWeather(data, type) {
        if(type == 'current') {
            const dateTime = getFormattedDateTime(data.dt)
            render(dateTime.date + ' · ' + dateTime.time, document.querySelector('#wthr-time'))
            render(renderIcon(data.weather[0].main.toLowerCase()) + ' ' + Math.round(data.main.temp) + '°', document.querySelector('#wthr-current'))
        } else {
            render(this.getForecastHTML(this.calculateForecast(data)), document.querySelector('#wthr-forecast'))
        }
    },

    /**
     * saves weather JSON in local storage
     * @param {JSON} weatherData weather data got by API as JSON 
     * @param {string} type current or forecast depending on the type of weather to be saved
     */
    saveWeather(weatherData, type) {
        weatherData.time = Date.now();
        if(type === 'current') {
            localStorage.setItem('recentWeather', JSON.stringify(weatherData))
        } else if (type === 'forecast') {
            localStorage.setItem('forecastWeather', JSON.stringify(weatherData))
        }
        
    },

    /**
     * generates HTML for forecast data
     * @param {Array} forecastArray forecast data for the next days with [Day|Condition|Degree] as array items
     * @returns {HTML} forecastHTML forecast as HTML
     */
    getForecastHTML(forecastArray) {
        let forecastHTML = '<ul>'
        forecastArray.forEach((subArray) => {
            forecastHTML += '<li>'
            subArray.forEach((value, index) => {
                if(index == 0) {
                    forecastHTML += `<div class="day">${value}</div>`
                } else if(index == 1) {
                    forecastHTML += '<div class="condition">' + renderIcon(value.toLowerCase()) + '</div>'
                } else if(index == 2) {
                    forecastHTML += `<div class="degree">${value}°</div>`
                }
            })
            forecastHTML += '</li>'
        })
        forecastHTML += '</ul>'
        return forecastHTML
    },

    /**
     * generates a multidimensional array with forecast data
     * @param {JSON} forecast API response
     * @returns {Array} forecastArray array containing forecast data for the next days with [Day|Condition|Degree] as array items
     */
    calculateForecast(forecast) {
        let forecastArray = [];
        for (let i = 0; i < forecast.list.length; i++) {
            // we only want the forecast for the afternoon hours
            if(new Date(forecast.list[i].dt * 1000).getHours() == 13 || new Date(forecast.list[i].dt * 1000).getHours() == 14) {
                forecastArray.push([
                    new Date(forecast.list[i].dt_txt).toLocaleDateString('de-DE', { weekday: 'long' }), 
                    forecast.list[i].weather[0].main, 
                    Math.round(forecast.list[i].main.temp)
                ])
            }
        }
        return forecastArray
    }

}

export {
    Weather
}