const GEO_API_URL = "http://api.openweathermap.org/geo/1.0/direct"
const CURRENT_API_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "afd8d14c5c3e6c1ef0abb346f8e1eff4"

const getCities = function(query: string) {
	return fetch(`${GEO_API_URL}?q=${query}&limit=5&appid=${API_KEY}`)
}

const getCurrent = function(coordinates: {lat: number, lon: number}) {
	let {lat, lon} = coordinates
	return fetch(`${CURRENT_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
}

export {getCities, getCurrent}