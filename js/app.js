import { Favorite } from './favorite.js'
import { Home } from './home.js'
import { Search } from './search.js'
import { navigation } from './navigation.js'

navigation((event, target) => {
    const item = target.getAttribute('aria-controls')
    if(item === 'favorites') {
        Favorite.init()
    } else if(item === 'search') {
        Search.init()
    } else {
        Home.init()
    }
})

// Default
Home.init()