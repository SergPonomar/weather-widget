const BASE_URL = "http://api.openweathermap.org/"
const GEO_API_URL = BASE_URL + "geo/1.0/direct"
const REVERSE_GEO_API_URL = BASE_URL + "geo/1.0/reverse"
const CURRENT_API_URL = BASE_URL + "data/2.5/weather"
const API_KEY = "afd8d14c5c3e6c1ef0abb346f8e1eff4"

const getCities = function(query: string) {
	return fetch(`${GEO_API_URL}?q=${query}&limit=3&appid=${API_KEY}`)
}

const getCurrent = function(coordinates: {lat: number, lon: number}) {
	const {lat, lon} = coordinates
	return fetch(`${CURRENT_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
}

const getNameByCoords = function(coordinates: {lat: number, lon: number}) {
	const {lat, lon} = coordinates
	return fetch(`${REVERSE_GEO_API_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
}

export {getCities, getCurrent, getNameByCoords}