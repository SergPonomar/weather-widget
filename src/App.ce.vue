<script setup lang="ts">
import { provide, reactive, ref, watch, onMounted } from 'vue'
import { getCurrent } from './utils/weatherApi'
import type { Ref } from 'vue'

//const state = reactive(new Map())
const userCities: Ref<Array<string>> = ref([])
const comp = ref()

onMounted(() => {
  if (localStorage["weather-widget"]) {
    userCities.value = JSON.parse(localStorage["weather-widget"])
  }
  //Set 'selected-cities' props thru JS property
  comp.value.selected = userCities
})

//TO-DO: replace with closed event
watch(userCities, (cities) => {
  localStorage["weather-widget"] = JSON.stringify(cities)
},{ deep: true })



function addCityHandler(e: CustomEvent) {
  const city = e.detail[0]
  const cityKey = JSON.stringify(city)
  if (!userCities.value.includes(cityKey)) {
    userCities.value.push(cityKey)
  }
  /*
  if (!state.has(JSON.stringify(coordinates))) {
    getCurrent(coordinates)
      .then((res) => res.json())
      .then((res) => {
        state.set(JSON.stringify(coordinates), res)
      })
  }
  */
}

function changePosition(e: CustomEvent) {
  const {oldIndex, newIndex} = e.detail[0]

  const element = userCities.value.splice(oldIndex, 1)[0];
  userCities.value.splice(newIndex, 0, element);
}
</script>

<template>
  <city-weather
    v-for="city in userCities"
    :city="city"
    :key="city"
  />
  <settings-component>
    <selected-cities 
      ref="comp"
      @changepos="changePosition"
    />
    <add-location @addcity="addCityHandler" />
  </settings-component>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
* {
  font-family: 'Roboto', sans-serif;
}
</style>
