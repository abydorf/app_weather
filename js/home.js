import { City } from './city.js'
import { Weather } from './weather.js'
import { render, renderLoadingIndicator } from './util.js'

const Home = {

    init() {
        const currentCityObject = (City.getAll().length > 0) ? City.getAll()[0] : ''
        if(currentCityObject === '') {
            // no cities saved, nothing to show, go to search
            document.getElementById('btn-search').click()
            return
        }
        render(currentCityObject.name, document.querySelector('#wthr-city'))
        renderLoadingIndicator(document.querySelector('#wthr-current'))
        if(this.renderSavedWeather(currentCityObject.name) === false) {
            // do weather API call and render its response, saved weather considered too old
            Weather.getWeather(currentCityObject, 'current')
            Weather.getWeather(currentCityObject, 'forecast')
        } else {
            // render saved weather
            Weather.renderWeather(JSON.parse(localStorage.getItem('recentWeather')), 'current')
            Weather.renderWeather(JSON.parse(localStorage.getItem('forecastWeather')), 'forecast')
        }
    },

    /**
     * determine wheather saved weather should be rendered (available and older less than 3 hours)
     * @param {string} cityName name of current city to be displayed on homepage
     * @returns {boolean} renderSavedWeather identifier whether saved wheather should be rendered
     */
    renderSavedWeather(cityName) {
        let renderSavedWeather = false
        if(localStorage.getItem('recentWeather') !== null) {
            const savedWeather = JSON.parse(localStorage.getItem('recentWeather'))
            if(savedWeather.name.includes(cityName)) { // "includes()", because "name" might contains things like "Bezirk"
                const TIME_SAVED = savedWeather.time
                const TIME_CURRENT = new Date().getTime()
                const THREE_HOURS = 3600000 * 3
                if((TIME_SAVED - TIME_CURRENT) > THREE_HOURS) {
                    renderSavedWeather = false
                    console.log('renderSavedWeather == false')
                } else {
                    renderSavedWeather = true
                    console.log('renderSavedWeather == true')
                }
            }
        }
        return renderSavedWeather
    }

}

export {
    Home
}