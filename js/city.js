const City = {

    /**
     * get data of all cities
     * @returns {array} cityArray local storage item 'cities' as array, if not empty. Returns empty array otherwise
     */
    getAll() {
        let cityArray = []
        if(localStorage.getItem('cities') !== null) {
            cityArray = JSON.parse(localStorage.getItem('cities'))
        }
        return cityArray
    },

    /**
     * get data of single city by name
     * @param {string} cityName
     * @returns {object} object found in local storage for name
     * @todo error handling
     */
    getCity(cityName) {
        const cityArray = JSON.parse(localStorage.getItem('cities'))
        const cityObject = cityArray.find(x => x.name === cityName)
        return cityObject
    },

    /**
     * make any city 'favorite' by removing it from any position in the array and putting it into first position again
     * @param {string} cityName name of the city to be put into first position
     */
    makeFavorite(cityName) {
        const cityArray = JSON.parse(localStorage.getItem('cities'))
        const cityObject = cityArray.find(x => x.name === cityName)
        const indexOfElement = cityArray.findIndex(x => x.name === cityName);
        cityArray.splice(indexOfElement, 1);
        cityArray.splice(0, 0, cityObject)
        localStorage.setItem("cities", JSON.stringify(cityArray))
    },

    /**
     * Saves city in local storage item
     * @param {object} cityObject object with city data to be saved
     * @param {string} operation optional parameter to indicate a possible removal of an entry
     * @retuns {array} cityArray updated city array, potentially updated
     */
    updateCities(cityObject, operation = 'update') {
        let cityArray = this.getAll();
        if(operation === 'remove') {
            let index = cityArray.findIndex(x => x.name === cityObject.name)
            cityArray.splice(index,1)
        } else {
            let saved = cityArray.find(x => x.name === cityObject.name)
            if (typeof saved == 'undefined') {
                cityArray.push(cityObject)
            }
        }
        localStorage.setItem("cities", JSON.stringify(cityArray))
        return cityArray
    }

}



/**
 * get city details from JSON string to be saved in local storage
 * the nominatim web service responds with different types [city, town, village]
 * @param {object} json JSON object to get the city details from
 * @returns {object} city details as object with name, lat, long
 */
function getCityDetailsFromJSON(json) {
    let name;
    if(json.address.hasOwnProperty('city')) {
        name = json.address.city
    } else if(json.address.hasOwnProperty('town')) {
        name = json.address.town
    } else if(json.address.hasOwnProperty('village')) {
        name = json.address.village
    } else if(json.address.hasOwnProperty('state')) {
        name = json.address.state
    }
    const details = {
        'name': name,
        'lat': json.lat, 
        'lon': json.lon
    }
    return details
}

export { 
    City
    //getCities, 
    //getCity, 
    //updateCities, 
    //getCityDetailsFromJSON 
}