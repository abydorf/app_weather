import { City } from './city.js'
import { render, renderLoadingIndicator } from './util.js'

var Search = {

    init() {
        document.getElementById('wthr-result').innerHTML = ''
        document.querySelector("#search-form").addEventListener("submit", function(e) {
            let value = document.querySelector('#search-form-input').value
            const regexp = new RegExp(/^(\w[ a-zA-ZÄÖÜäöüß]+)?\s\d{5}$/)
            if(regexp.test(value)) {
                renderLoadingIndicator(document.querySelector('#wthr-result'))
                Search.getGeoApiJSON(value)
            }
            e.preventDefault();
        })
    },

    /**
     * call GEO API and save city data in local storage via updateCities()
     * @param {string} name name of city
     */
    getGeoApiJSON(name) {
        fetch(`/.netlify/functions/geo-json/?name=${name}`)
        .then(function(resp) {
            if(resp.ok) {
                return resp.json()
            } else {
                throw new Error('there was an error');
            }
        })
        .then(function(data) {
            Search.renderResult(true, data[0])
        })
        .catch(error => {
            Search.renderResult(false, '')
        })
    },

    renderResult(result, data) {
        if(result) {
            if(data.hasOwnProperty('address')) {
                let name, zip
                if(data.address.hasOwnProperty('city')) {
                    name = data.address.city
                } else if(data.address.hasOwnProperty('town')) {
                    name = data.address.town
                } else if(data.address.hasOwnProperty('village')) {
                    name = data.address.village
                } else if(data.address.hasOwnProperty('state')) {
                    name = data.address.state
                }
                if(data.address.hasOwnProperty('postcode')) {
                    zip = data.address.postcode
                } else {
                    zip = ''
                }
                const details = {
                    'name': name,
                    'lat': data.lat, 
                    'lon': data.lon,
                    'country': data.address.country,
                    'zip': zip
                }
                render(`<div>${details.name} ${details.zip} ${details.country}</div><button id='wthr-search-save' style="display:block">Save</button>`, document.querySelector('#wthr-result'))
                document.getElementById('wthr-search-save').addEventListener('click', event => {
                    City.updateCities(details)
                    City.makeFavorite(details.name)
                    document.getElementById('btn-home').click();
                })
            } else {
                render('<div>no result, please try again</div>', document.querySelector('#wthr-result'))
            }
        } else {
            render('<div>no result, please try again</div>', document.querySelector('#wthr-result'))
        }
    }

}

export {
    Search
}