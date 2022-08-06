<script setup lang="ts">
import { provide, reactive, ref, watch, onMounted } from 'vue'
import { getCurrent } from './utils/weatherApi'
import type { Ref } from 'vue'

const state = reactive(new Map())
const userCities: Ref<Array<string>> = ref([])
const comp = ref()

onMounted(() => {
  //console.log(comp.value)
  comp.value.commentIds = [1,2,3]
  comp.value.selected = userCities
  console.log(comp)
})

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
  //console.log("changepos ", oldIndex, " ", newIndex)
}
</script>

<template>
  <!--div v-for="coor in state.keys()">{{coor}}</div-->
  <settings-component>
    <selected-cities 
      ref="comp"
      @changepos="changePosition"
    />
    <add-location @addcity="addCityHandler" />
  </settings-component>
</template>

<style>
.pipa {
  background: black;
}
</style>
