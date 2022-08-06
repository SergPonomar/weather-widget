<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { getCities } from '../utils/weatherApi'

const emit = defineEmits<{
  (e: 'addcity', city: object): void
}>()

const inputValue = ref("")
const cityList = ref([])
const timeout: Ref<ReturnType<typeof setTimeout> | undefined> = ref(undefined)

watch(inputValue, (val) => {
  if (timeout.value) clearTimeout(timeout.value)
  if (val.length > 0) {
    timeout.value = setTimeout(() => {
      getCities(val)
        .then((res) => res.json())
        .then((res) => {
          cityList.value = res
        })
    }, 1000)
  }
})

function handler(city: object) {
  emit('addcity', city)
}
</script>

<template>
  <input 
    v-model="inputValue"
    placeholder="search city"
  />
  <div>{{inputValue}}</div>
  <div 
    v-for="city in cityList"
    @click="handler(city)"
  >
    {{city.name}}, {{city.country}}
  </div>
</template>

<style>
.pipa2 {
  background: DeepSkyBlue;
}
</style>
