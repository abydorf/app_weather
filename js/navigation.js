function navigation(callback) {
    render(Array.from(document.getElementsByTagName("section")).find(x => x.className === 'active').id)
    document.getElementById('navigation').addEventListener('click', event => {
        if(event.target.className === 'btn-nav') {
            render(event.target.getAttribute('aria-controls'))
        }
        callback(event, event.target);
    })
}

/**
 * hides all three sections and - if argument provided - shows provided section 
 * @param {string} section section id
 */
function render(section) {
    const buttons = Array.from(document.getElementsByClassName("btn-nav"))
    buttons.forEach((element) => element.classList.remove('active'))
    const sections = Array.from(document.getElementsByTagName("section"))
    sections.forEach((element) => {
        element.style.display = 'none'
        element.classList.remove('active')
        if(element.id === section) {
            element.classList.add('active')
        }
    })
    const activeSection = sections.find(x => x.className === 'active')
    activeSection.style.display = 'block'
    const activeNavItem = document.getElementById(activeSection.getAttribute('aria-labelledby'))
    activeNavItem.classList.add('active')  
}

export {
    navigation
}