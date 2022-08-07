<script setup lang="ts">
import WeatherIcon from './WeatherIcon.vue'
import IconWind from './icons/IconWind.vue'
import IconBarometer from './icons/IconBarometer.vue'

import { computed, ref, reactive, onMounted } from 'vue'
import { getCurrent } from '../utils/weatherApi'
import { firstToUpperCase } from '../utils/helpers'
import { msToBeufortDesc, degToDirection } from '../utils/weatherLUTs'
import type { Ref } from 'vue'

const props = defineProps<{
  city: string
}>()

interface Weather {
  weather: { 
  	description: string
  	icon: string
	}[]
  main: {
  	feels_like: number
  	temp: number
  	pressure: number
  	humidity: number
  }
  wind: {
  	speed: number
  	deg: number
  }
  visibility: number
}

const cityWeather: Ref<Weather | null> = ref(null)

const cityObj = computed(() => JSON.parse(props.city))

const temperature = computed(() => {
	return cityWeather.value !== null? 
		Math.round(cityWeather.value.main.temp) + "°C": null
})

const description = computed(() => {
	return cityWeather.value !== null? 
		"Feels like " + 
		Math.round(cityWeather.value.main.feels_like) + "°C. " + 
		firstToUpperCase(cityWeather.value.weather[0].description) + ". " + 
		msToBeufortDesc(cityWeather.value.wind.speed)
		: null
})

const wind = computed(() => {
	return cityWeather.value !== null?
		cityWeather.value.wind.speed.toFixed(1) + " m/s " + 
		degToDirection(cityWeather.value.wind.deg)
		: null
})

const visibility = computed(() => {
	return cityWeather.value !== null?
		"Visibility: " + (cityWeather.value.visibility/1000).toFixed(1) + " km"
		: null
})

onMounted(() => {
	getCurrentWeather()
})

function getCurrentWeather() {
	const {lat, lon} = cityObj.value
	getCurrent({lat, lon})
	  .then((res) => res.json())
	  .then((res) => {
	    cityWeather.value = res
			console.log(cityWeather.value)
	  })
}
</script>

<template>
	<div class="city-weather">
		<h1 class="city-weather__title">{{cityObj.name}}, {{cityObj.country}}</h1>
		<div 
			v-if="cityWeather"
			class="city-weather__card"
		>
			<div class="city-weather__header">
				<WeatherIcon :iconId="cityWeather.weather[0].icon"/>
				<h2 class="city-weather__temperature">{{temperature}}</h2>
			</div>
			<p class="city-weather__description">{{description}}</p>
			<ul class="city-weather__properties">
				<li class="city-weather__property">
					<IconWind />
					<span>{{wind}}</span>
				</li>
				<li class="city-weather__property">
					<IconBarometer />
					<span>{{cityWeather.main.pressure}} hPa</span>
				</li>
				<li class="city-weather__property">
					<span>Humidity: {{cityWeather.main.humidity}}%</span>
				</li>
				<li class="city-weather__property">
					<span>{{visibility}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<style>
.city-weather__title {
	padding: 0 5px 0 5px;
	font-size: 16px;
	color: hsl(0, 0%, 40%);
}
.city-weather__card {
	padding: 0 5px 5px 5px;
	font-size: 14px;
	border: 1px solid #d2dbf9;
	border-radius: 5px;
}
.city-weather__header {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
.city-weather__temperature {
	font-size: 36px;
}
.city-weather__properties {
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	column-gap: 10px;
}
.city-weather__property {
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 100px;
	white-space: nowrap;
}
</style>
