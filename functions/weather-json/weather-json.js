require('dotenv').config();

const fetch = require('node-fetch')
const OWM_KEY = process.env.OWM_KEY;

exports.handler = async (event) => {
	
	const lat = event.queryStringParameters.lat
	const lon = event.queryStringParameters.lon
	const endpoint = (event.queryStringParameters.type == 'current') ? 'weather' : 'forecast'
	
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${OWM_KEY}`)
		if(!response.ok) {
			return { 
				statusCode: response.status, 
				body: response.statusText 
			}
		}
		const data = await response.json();
	  	return {
			statusCode: 200,
			body: JSON.stringify(data),
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			body: JSON.stringify({
				error: err.message
			})
		}
	}

}