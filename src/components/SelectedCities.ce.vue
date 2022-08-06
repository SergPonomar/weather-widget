<script setup lang="ts">
import { computed, ref, watch, onBeforeUpdate } from 'vue'
import type { Ref } from 'vue'
import { getCities } from '../utils/weatherApi'

const props = defineProps<{
  commentIds?: Array<number>
  selected?: Ref<Array<string>>
}>()

const emit = defineEmits<{
  (e: 'changepos', indexes: object): void
}>()

const cities = computed(() => props.selected?.value)
const divs = ref([])
const dummy = ref()
const container = ref()
const selCity: Ref<number | null> = ref(null)
const selCityInitial: Ref<number | null> = ref(null)
const startY: Ref<number> = ref(0)
const elHeight: Ref<number> = ref(0)

onBeforeUpdate(() => {
  divs.value = []
})

watch(selCity, (newPos, oldPos) => {
  if (oldPos !== null && newPos !== null) {
    const oldEL = divs.value[oldPos] as Element
    const newEL = divs.value[newPos] as Element
    newEL.classList.add("selected-cities__city_selected")
    oldEL.classList.remove("selected-cities__city_selected")
    emit('changepos', {oldIndex: oldPos, newIndex: newPos})
  }
})

function dragStart(e: MouseEvent, i: number) {
  selCity.value = i
  selCityInitial.value = i
  startY.value = e.clientY

  container.value.addEventListener("mousemove", drag)
  const target = e.target as Element
  elHeight.value = target.getBoundingClientRect().height
  target.classList.add("selected-cities__city_selected")
}

function dragEnd(e: Event) {
  container.value.removeEventListener("mousemove", drag)
  divs.value.forEach((el: Element) => {
    el.classList.remove("selected-cities__city_selected")
  })
  selCity.value = null
  selCityInitial.value = null
}

function drag(e: MouseEvent) {
  const dY = e.clientY - startY.value
  const dPos = Math.trunc(dY/elHeight.value)
  if (selCity.value !== null && selCityInitial.value !== null) {
    selCity.value = selCityInitial.value + dPos
  }
}
</script>

<template>
  <div 
    class="selected-cities"
    ref="container"
    @mouseup="dragEnd"
  >
    <div 
      v-for="(city, i) in cities"
      class="selected-cities__city"
      :ref="el => { if (el) divs[i] = el }"
      @mousedown="(e) => dragStart(e, i)"
    >
      {{JSON.parse(city).name}}, {{JSON.parse(city).country}}
    </div>
    <div
      ref="dummy"
      class="selected-cities__dummy"
    >
    </div>
  </div>
</template>

<style>
.selected-cities {
  width: 300px;
}
.selected-cities__city {
  display: flex;
  align-items: center;
  background: DeepSkyBlue;
  height: 30px;
  border: 1px solid black;
  user-select: none;
}
.selected-cities__city_selected {
  opacity: 0.5;
}
.selected-cities__city:not(:last-child) {
  border-bottom: none;
}
.selected-cities__dummy {
  position: absolute;
}
</style>
