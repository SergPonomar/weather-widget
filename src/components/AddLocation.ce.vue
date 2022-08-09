<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { getCities } from '../utils/weatherApi'

interface City {
  name: string
  country: string
}

const emit = defineEmits<{
  (e: 'addcity', city: City): void
}>()

const inputValue = ref("")
const cityList: Ref<City[] | null> = ref([])
const timeout: Ref<ReturnType<typeof setTimeout> | undefined> = ref(undefined)

watch(inputValue, (val) => {
  if (timeout.value) clearTimeout(timeout.value)
  if (val.length > 0) {
    timeout.value = setTimeout(() => {
      getCities(val)
        .then((res) => {
          if (res.ok) return res.json()
        })
        .then((res) => {
          cityList.value = res
        })
    }, 1000)
  }
})

function handler(city: City) {
  emit('addcity', city)
  inputValue.value = ""
  cityList.value = []
}
</script>

<template>
  <div class="add-location">
    <h2 class="add-location__title">Add location:</h2>
    <input 
      v-model="inputValue"
      placeholder="search city"
      class="add-location__input"
    />
    <div 
      v-for="city in cityList"
      @click="handler(city)"
      class="add-location__option"
    >
      {{city.name}}, {{city.country}}
    </div>
  </div>
</template>

<style>
.add-location__title {
  padding: 0 5px;
  font-size: 16px;
  color: hsl(0, 0%, 40%);
}
.add-location__input {
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d2dbf9;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}
.add-location__input:focus {
  outline: 2px solid #4469E4;
}
.add-location__option {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #d2dbf9;
}
.add-location__option:not(:first-child) {
  border-top: none;
}
.add-location__option:last-child {
  border-radius: 0 0 5px 5px;
}
.add-location__option:hover {
  background-color: #dae1f1;
}
</style>
