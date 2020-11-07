require('dotenv').config();

const fetch = require('node-fetch')
const LIQ_KEY = process.env.LIQ_KEY;

exports.handler = async (event) => {
	
	const name = encodeURI(event.queryStringParameters.name)
	
	try {
		const response = await fetch(`https://eu1.locationiq.com/v1/search.php?key=${LIQ_KEY}&q=${name}&addressdetails=1&format=json&limit=1&accept-language=de`)
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