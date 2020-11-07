import { City } from './city.js'
import { render } from './util.js'

const Favorite = {

    init() {
        let cities = City.getAll()
        if(City.getAll().length === 0) {
            document.getElementById('btn-search').click()
        }
        this.list(cities)
        document.getElementById('wthr-favorites').addEventListener('click', event => {
            if(event.target.className === 'delete') {
                const cityObject = City.getCity(event.target.getAttribute('data-city'))
                City.updateCities(cityObject, 'remove')
                this.init()
            }
            if(event.target.nodeName === 'LI') {
                City.makeFavorite(event.target.getAttribute('data-city'))
                document.getElementById('btn-home').click(); 
            }
        })
    },

    list(citiesToRender) {
        let listHTML = '<ul>'
        citiesToRender.forEach((entry) => {
            listHTML += `<li data-city="${entry.name}">`
            listHTML += `<div class="city">${entry.name}</div>`
            listHTML += `<div class="delete" data-city="${entry.name}">delete</div>`
            listHTML += '</li>'
        })    
        listHTML += '</ul>'
        render(listHTML, document.querySelector('#wthr-favorites'))
    }

}

export {
    Favorite
}