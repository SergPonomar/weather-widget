<script setup lang="ts">
import { provide, reactive, ref, watch, onMounted } from 'vue'
import { getCurrent, getNameByCoords } from './utils/weatherApi'
import type { Ref } from 'vue'

const userCities: Ref<Array<string>> = ref([])
const settingsIsOpen: Ref<boolean> = ref(false)
const selCities: Ref<Element | null> = ref(null)
const closeButton = ref()

onMounted(() => {
  if (localStorage["weather-widget"]) {
    userCities.value = JSON.parse(localStorage["weather-widget"])
    if (userCities.value.length === 0) settingsIsOpen.value = true
  } else {
    getUserLocation()
  }
  //Set custom elements props thru JS property
  //selCities.value.selected = userCities
  //console.log(selCities.props)
  //closeButton.value.closed = settingsIsOpen
})

//Store new position in localStorage
watch(userCities, (cities) => {
  localStorage["weather-widget"] = JSON.stringify(cities)
},{ deep: true })

function getUserLocation() {
  const errorFunc = () => {
    settingsIsOpen.value = true
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      getNameByCoords({lat: pos.coords.latitude, lon: pos.coords.longitude})
        .then((res) => res.json())
        .then((res) => {
          userCities.value.push(JSON.stringify(res[0]))
        })
    }, errorFunc)
  } else {
    errorFunc()
  }
}

function addCityHandler(e: CustomEvent) {
  const city = e.detail[0]
  const cityKey = JSON.stringify(city)
  if (!userCities.value.includes(cityKey)) {
    userCities.value.push(cityKey)
  }
}

function deleteCityHandler(e: CustomEvent) {
  const cityIndex = e.detail[0]
  userCities.value.splice(cityIndex, 1)
}

function changePosition(e: CustomEvent) {
  const {oldIndex, newIndex} = e.detail[0]

  const element = userCities.value.splice(oldIndex, 1)[0];
  userCities.value.splice(newIndex, 0, element);
}

function settingToggle(e: CustomEvent) {
  if (userCities.value.length) {
    settingsIsOpen.value = !settingsIsOpen.value
  }
}
</script>

<template>
  <div class="app">  
    <ce-settings-button 
      ref="closeButton"
      :closed="settingsIsOpen"
      @toggle="settingToggle"
    />     
    <ce-city-weather
      v-show="!settingsIsOpen"
      v-for="city in userCities"
      :city="city"
      :key="city"
    />
    <div v-show="settingsIsOpen">
      <ce-selected-cities 
        ref="selCities"
        :selected="userCities"
        @changepos="changePosition"
        @deletecity="deleteCityHandler"
      />
      <ce-add-location 
        @addcity="addCityHandler"
      />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
* {
  font-family: 'Roboto', sans-serif;
}
.app {
  position: relative;
  box-sizing: border-box;
}
</style>
