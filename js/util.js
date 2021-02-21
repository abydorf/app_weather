 /**
 * render elements into DOM
 * @param template HTML or simple string to render
 * @param {object} node HTML element as object to render template into
 */
function render(template, node) {
    node.innerHTML = template
}

/**
 * display loading indicator which gets overwritten later by render() after API calls
 * @param {object } node HTML element as object to render HTML into
 */
function renderLoadingIndicator(node) {
    node.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100" class="loading-indicator" style="height:30px;width:30px"><circle cx="50" cy="50" r="35" fill="none" stroke="#d1d1d1" stroke-dasharray="164.93361431 56.97787144" stroke-width="5"><animateTransform attributeName="transform" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0 50 50;360 50 50"/></circle></svg>'
}

/**
 * holds SVG code for weather icons and returns it
 * https://github.com/christiannaths/Climacons-Font
 * @param {string} condition weather condition as a string
 * @param {string} type optional argument kind of display, defaults to current. Allows to display sun icon for confition clear, despite the time of day for the forecast
 * @return {string} iconHTML SVG code
 */
function renderIcon(condition, type = 'current') {
    let iconHTML;
    const hours = new Date().getHours()
    const daytime = ((hours > 6) && (hours < 20)) ? true : false
    switch (condition) {
        case 'clear':
            if(type === 'current') {
                if(daytime) {
                    // Daytime
                    iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><defs/><path fill-rule="evenodd" d="M71.997 51.999h-3.998c-1.105 0-2-.895-2-1.999s.895-2 2-2h3.998c1.105 0 2 .896 2 2s-.894 1.999-2 1.999zm-7.855-13.311c-.781.781-2.049.781-2.828 0-.781-.781-.781-2.047 0-2.828l2.828-2.828c.779-.781 2.047-.781 2.828 0 .779.781.779 2.047 0 2.828l-2.828 2.828zm-14.141 23.31c-6.627 0-12-5.372-12-11.998 0-6.627 5.372-11.999 12-11.999 6.627 0 11.998 5.372 11.998 11.999 0 6.626-5.371 11.998-11.998 11.998zm0-19.997c-4.418 0-8 3.581-8 7.999 0 4.417 3.583 7.999 8 7.999s7.998-3.582 7.998-7.999c0-4.418-3.58-7.999-7.998-7.999zm0-7.999c-1.105 0-2-.896-2-2v-3.999c0-1.104.895-2 2-2 1.104 0 2 .896 2 2v3.999c0 1.104-.897 2-2 2zM35.86 38.688l-2.828-2.828c-.781-.781-.781-2.047 0-2.828s2.047-.781 2.828 0l2.828 2.828c.781.781.781 2.047 0 2.828s-2.047.781-2.828 0zM34.002 50c0 1.104-.896 1.999-2 1.999h-4c-1.104 0-1.999-.895-1.999-1.999s.896-2 1.999-2h4c1.105 0 2 .896 2 2zm1.858 11.312c.781-.78 2.047-.78 2.828 0 .781.781.781 2.048 0 2.828l-2.828 2.828c-.781.781-2.047.781-2.828 0-.781-.78-.781-2.047 0-2.828l2.828-2.828zm14.141 4.686c1.104 0 2 .895 2 1.999v4c0 1.104-.896 2-2 2-1.105 0-2-.896-2-2v-4c0-1.104.895-1.999 2-1.999zm14.141-4.686l2.828 2.828c.779.781.779 2.048 0 2.828-.781.781-2.049.781-2.828 0l-2.828-2.828c-.781-.78-.781-2.047 0-2.828.779-.781 2.046-.781 2.828 0z" clip-rule="evenodd"/></svg>'
                } else {
                    // Nighttime
                    iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M50 61.998c-6.627 0-11.999-5.372-11.999-11.998 0-6.627 5.372-11.999 11.999-11.999.755 0 1.491.078 2.207.212-.132.576-.208 1.173-.208 1.788 0 4.418 3.582 7.999 8 7.999.615 0 1.212-.076 1.788-.208.133.717.211 1.452.211 2.208 0 6.626-5.372 11.998-11.998 11.998zm-1.788-19.79c-3.556.813-6.211 3.989-6.211 7.792 0 4.417 3.581 7.999 7.999 7.999 3.802 0 6.978-2.655 7.791-6.211-4.854-.904-8.676-4.726-9.579-9.58z" clip-rule="evenodd"/></svg>'
                }
            } else {
                // icon for forecast is always "sun"
                iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M71.997 51.999h-3.998c-1.105 0-2-.895-2-1.999s.895-2 2-2h3.998c1.105 0 2 .896 2 2s-.894 1.999-2 1.999zm-7.855-13.311c-.781.781-2.049.781-2.828 0-.781-.781-.781-2.047 0-2.828l2.828-2.828c.779-.781 2.047-.781 2.828 0 .779.781.779 2.047 0 2.828l-2.828 2.828zm-14.141 23.31c-6.627 0-12-5.372-12-11.998 0-6.627 5.372-11.999 12-11.999 6.627 0 11.998 5.372 11.998 11.999 0 6.626-5.371 11.998-11.998 11.998zm0-19.997c-4.418 0-8 3.581-8 7.999 0 4.417 3.583 7.999 8 7.999s7.998-3.582 7.998-7.999c0-4.418-3.58-7.999-7.998-7.999zm0-7.999c-1.105 0-2-.896-2-2v-3.999c0-1.104.895-2 2-2 1.104 0 2 .896 2 2v3.999c0 1.104-.897 2-2 2zM35.86 38.688l-2.828-2.828c-.781-.781-.781-2.047 0-2.828s2.047-.781 2.828 0l2.828 2.828c.781.781.781 2.047 0 2.828s-2.047.781-2.828 0zM34.002 50c0 1.104-.896 1.999-2 1.999h-4c-1.104 0-1.999-.895-1.999-1.999s.896-2 1.999-2h4c1.105 0 2 .896 2 2zm1.858 11.312c.781-.78 2.047-.78 2.828 0 .781.781.781 2.048 0 2.828l-2.828 2.828c-.781.781-2.047.781-2.828 0-.781-.78-.781-2.047 0-2.828l2.828-2.828zm14.141 4.686c1.104 0 2 .895 2 1.999v4c0 1.104-.896 2-2 2-1.105 0-2-.896-2-2v-4c0-1.104.895-1.999 2-1.999zm14.141-4.686l2.828 2.828c.779.781.779 2.048 0 2.828-.781.781-2.049.781-2.828 0l-2.828-2.828c-.781-.78-.781-2.047 0-2.828.779-.781 2.046-.781 2.828 0z" clip-rule="evenodd"/></svg>'                
            }
        break
        case 'clouds':
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M43.945 65.639c-8.835 0-15.998-7.162-15.998-15.998 0-8.836 7.163-15.998 15.998-15.998 6.004 0 11.229 3.312 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 11.999 5.373 11.999 12 0 6.625-5.372 11.998-11.999 11.998H43.945zm15.998-4c4.418 0 8-3.582 8-7.998 0-4.418-3.582-8-8-8-1.6 0-3.082.481-4.333 1.291-1.231-5.316-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.999 0 6.626 5.372 11.998 11.998 11.998h15.998z" clip-rule="evenodd"/></svg>'
        break
        case 'drizzle':
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M59.943 41.642c-.696 0-1.369.092-2.033.205-2.736-4.892-7.961-8.203-13.965-8.203-8.835 0-15.998 7.162-15.998 15.997 0 5.992 3.3 11.207 8.177 13.947.276-1.262.892-2.465 1.873-3.445l.057-.057c-3.644-2.061-6.106-5.963-6.106-10.445 0-6.626 5.372-11.998 11.998-11.998 5.691 0 10.433 3.974 11.665 9.29 1.25-.81 2.733-1.291 4.333-1.291 4.418 0 7.999 3.581 7.999 7.999 0 3.443-2.182 6.371-5.235 7.498.788 1.146 1.194 2.471 1.222 3.807 4.665-1.645 8.014-6.078 8.014-11.305-.002-6.627-5.374-11.999-12.001-11.999zM42.945 60.85l-2.121 2.121c-1.171 1.172-1.171 3.07 0 4.242 1.172 1.172 3.071 1.172 4.242 0 1.172-1.172 1.172-3.07 0-4.242l-2.121-2.121zm7 7.998l-2.121 2.121c-1.172 1.172-1.172 3.072 0 4.242 1.171 1.172 3.07 1.172 4.241 0 1.172-1.17 1.172-3.07 0-4.242l-2.12-2.121zm6.999-7.998l-2.121 2.121c-1.172 1.172-1.172 3.07 0 4.242 1.171 1.172 3.07 1.172 4.242 0 1.171-1.172 1.171-3.07 0-4.242l-2.121-2.121z" clip-rule="evenodd"/></svg>'
        break
        case 'rain':
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M63.943 64.941V60.56c2.389-1.383 4-3.961 4-6.92 0-4.417-3.582-7.999-8-7.999-1.6 0-3.082.48-4.333 1.291-1.231-5.317-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.998 0 3.55 1.551 6.728 4 8.925v4.916c-4.777-2.768-8-7.922-8-13.841 0-8.835 7.163-15.997 15.998-15.997 6.004 0 11.229 3.311 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 11.999 5.372 11.999 11.999 0 5.223-3.341 9.653-7.999 11.301zm-21.997-11.3c1.104 0 1.999.896 1.999 2v15.998c0 1.105-.895 2-1.999 2s-2-.895-2-2V55.641c0-1.104.896-2 2-2zm7.999 4c1.104 0 2 .895 2 2v15.998c0 1.104-.896 2-2 2s-2-.896-2-2V59.641c0-1.106.896-2 2-2zm7.999-4c1.104 0 1.999.896 1.999 2v15.998c0 1.105-.895 2-1.999 2s-2-.895-2-2V55.641c0-1.104.896-2 2-2z" clip-rule="evenodd"/></svg>'
        break
        case 'mist':
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M29.177 55.641c-.262-.646-.473-1.315-.648-2h43.47c0 .684-.07 1.348-.181 2H29.177zm7.086-19.998c2.294-1.271 4.93-1.999 7.738-1.999 2.806 0 5.436.73 7.727 1.999H36.263zm-8.121 11.999c.085-.682.218-1.347.387-1.999h40.396c.551.613 1.039 1.281 1.455 1.999H28.142zm1.035-3.999c.281-.693.613-1.359.984-2h27.682c.04.068.084.135.123.205.664-.114 1.338-.205 2.033-.205 2.451 0 4.729.738 6.627 2H29.177zm2.347-4c.58-.723 1.225-1.388 1.92-2h21.122c.69.61 1.326 1.28 1.903 2H31.524zm40.293 11.998H28.142c-.082-.656-.139-1.32-.139-1.999h43.298c.227.643.401 1.311.516 1.999zm-.516 6c-.247.699-.555 1.367-.921 2H31.524c-.505-.629-.957-1.299-1.363-2h41.14zm-37.857 4h35.48c-.68.758-1.447 1.434-2.299 1.999H36.263c-1.016-.562-1.954-1.24-2.819-1.999z" clip-rule="evenodd"/></svg>'
        break
        case 'snow':
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M63.999 64.943v-4.381c2.389-1.385 3.999-3.963 3.999-6.922 0-4.416-3.581-7.998-7.999-7.998-1.6 0-3.083.48-4.333 1.291-1.231-5.317-5.974-9.291-11.665-9.291-6.627 0-11.998 5.373-11.998 12 0 3.549 1.55 6.729 4 8.924v4.916c-4.777-2.768-8-7.922-8-13.84 0-8.836 7.163-15.999 15.998-15.999 6.004 0 11.229 3.312 13.965 8.204.664-.113 1.337-.205 2.033-.205 6.627 0 11.999 5.373 11.999 11.998 0 5.223-3.343 9.653-7.999 11.303zm-21.998-7.302c1.105 0 2 .896 2 2 0 1.105-.895 2-2 2-1.104 0-1.999-.895-1.999-2 0-1.104.895-2 1.999-2zm0 8c1.105 0 2 .895 2 2 0 1.104-.895 1.998-2 1.998-1.104 0-1.999-.895-1.999-1.998 0-1.106.895-2 1.999-2zm8-4c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2-1.105 0-2-.896-2-2 0-1.106.895-2 2-2zm0 7.998c1.104 0 2 .896 2 2 0 1.105-.896 2-2 2-1.105 0-2-.895-2-2 0-1.104.895-2 2-2zm7.998-11.998c1.105 0 2 .896 2 2 0 1.105-.895 2-2 2-1.104 0-1.999-.895-1.999-2 0-1.104.896-2 1.999-2zm0 8c1.105 0 2 .895 2 2 0 1.104-.895 1.998-2 1.998-1.104 0-1.999-.895-1.999-1.998 0-1.106.896-2 1.999-2z" clip-rule="evenodd"/></svg>'
        break
        case 'thunderstorm':
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M59.999 65.641h-1.062l3.585-4.412c3.181-1.057 5.477-4.053 5.477-7.588 0-4.418-3.581-7.998-7.999-7.998-1.601 0-3.083.48-4.333 1.29-1.232-5.316-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 12 0 5.446 3.632 10.038 8.604 11.504l-1.349 3.777c-6.52-2.021-11.255-8.098-11.255-15.282 0-8.835 7.163-15.999 15.998-15.999 6.004 0 11.229 3.312 13.965 8.204.664-.114 1.337-.205 2.033-.205 6.627 0 11.999 5.371 11.999 11.998s-5.373 12.001-12 12.001zm-11.998-14h9.998l-5.999 10h6.999L46.001 77.639l3.6-11.998h-6.6l5-14z" clip-rule="evenodd"/></svg>'
        break
        default:
            iconHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="25 25 50 50"><path fill-rule="evenodd" d="M71.997 51.999h-3.998c-1.105 0-2-.895-2-1.999s.895-2 2-2h3.998c1.105 0 2 .896 2 2s-.894 1.999-2 1.999zm-7.855-13.311c-.781.781-2.049.781-2.828 0-.781-.781-.781-2.047 0-2.828l2.828-2.828c.779-.781 2.047-.781 2.828 0 .779.781.779 2.047 0 2.828l-2.828 2.828zm-14.141 23.31c-6.627 0-12-5.372-12-11.998 0-6.627 5.372-11.999 12-11.999 6.627 0 11.998 5.372 11.998 11.999 0 6.626-5.371 11.998-11.998 11.998zm0-19.997c-4.418 0-8 3.581-8 7.999 0 4.417 3.583 7.999 8 7.999s7.998-3.582 7.998-7.999c0-4.418-3.58-7.999-7.998-7.999zm0-7.999c-1.105 0-2-.896-2-2v-3.999c0-1.104.895-2 2-2 1.104 0 2 .896 2 2v3.999c0 1.104-.897 2-2 2zM35.86 38.688l-2.828-2.828c-.781-.781-.781-2.047 0-2.828s2.047-.781 2.828 0l2.828 2.828c.781.781.781 2.047 0 2.828s-2.047.781-2.828 0zM34.002 50c0 1.104-.896 1.999-2 1.999h-4c-1.104 0-1.999-.895-1.999-1.999s.896-2 1.999-2h4c1.105 0 2 .896 2 2zm1.858 11.312c.781-.78 2.047-.78 2.828 0 .781.781.781 2.048 0 2.828l-2.828 2.828c-.781.781-2.047.781-2.828 0-.781-.78-.781-2.047 0-2.828l2.828-2.828zm14.141 4.686c1.104 0 2 .895 2 1.999v4c0 1.104-.896 2-2 2-1.105 0-2-.896-2-2v-4c0-1.104.895-1.999 2-1.999zm14.141-4.686l2.828 2.828c.779.781.779 2.048 0 2.828-.781.781-2.049.781-2.828 0l-2.828-2.828c-.781-.78-.781-2.047 0-2.828.779-.781 2.046-.781 2.828 0z" clip-rule="evenodd"/></svg>'
        break
    }
    return iconHTML
}

/**
 * get localized date and time
 * @param {string} timestamp UNIX timestamp returned by API
 * @returns {object} dateObject containing date and time
 */
function getFormattedDateTime(timestamp) {
    const dateTime = new Date(timestamp * 1000)
    let dateObject = {}
    return dateObject = {
        date: dateTime.toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        time: dateTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    }
}

export {
    render,
    renderLoadingIndicator,
    renderIcon,
    getFormattedDateTime
}