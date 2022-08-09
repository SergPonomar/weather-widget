<script setup lang="ts">
import IconHamburger from './icons/IconHamburger.vue'
import IconTrash from './icons/IconTrash.vue'
import { computed, ref, watch, onBeforeUpdate, nextTick } from 'vue'
import type { Ref } from 'vue'
import { clamp } from '../utils/helpers'

const props = defineProps<{
  selected?: string[] | string
}>()

const emit = defineEmits<{
  (e: 'changepos', indexes: object): void
  (e: 'deletecity', index: number): void
}>()

//const cities = computed(() => props.selected?.value)
const divs: Ref<Element[]> = ref([])
const container: Ref<HTMLElement | undefined> = ref()
const containerHeight: Ref<number | undefined> = ref()
const selCity: Ref<number | null> = ref(null)
const selCityInitial: Ref<number | null> = ref(null)
const startY: Ref<number> = ref(0)
const elHeight: Ref<number> = ref(0)


onBeforeUpdate(() => {
  divs.value = []
})

//Emit event on change position of city
watch(selCity, (newPos, oldPos) => {
  if (oldPos !== null && newPos !== null) {
    emit('changepos', {oldIndex: oldPos, newIndex: newPos})
  }
})

//Set container animation
watch(() => props.selected?.length, (newLen, oldLen) => {
  if (newLen !== undefined && oldLen !== undefined && newLen < oldLen) {
    containerHeight.value = container.value?.offsetHeight
    nextTick(() => {
      if (containerHeight.value && newLen !== 0) {
        containerHeight.value -= elHeight.value
      }
      setTimeout(() => containerHeight.value = undefined, 500)
    })
  }
})

function cityName(city: string) {
  return city? JSON.parse(city).name + ', ' + JSON.parse(city).country: ""
}

function dragStart(e: MouseEvent | TouchEvent, i: number) {
  if (divs.value.length > 1) {
    selCity.value = i
    selCityInitial.value = i
    if (e instanceof MouseEvent) {
      startY.value = e.clientY
      container.value?.addEventListener("mousemove", drag)
    } else if (e instanceof TouchEvent) {
      startY.value = e.touches[0].clientY
      container.value?.addEventListener("touchmove", drag)
    }

    container.value?.classList.add("selected-cities_moved")

    const el = divs.value[i] as Element
    elHeight.value = el.getBoundingClientRect().height
    el.classList.add("selected-cities__city_selected")
  }
}

function dragEnd(e: MouseEvent | TouchEvent) {
  if (e instanceof MouseEvent) {
    container.value?.removeEventListener("mousemove", drag)
  } else if (e instanceof TouchEvent) {
    container.value?.removeEventListener("touchmove", drag)
  }

  container.value?.classList.remove("selected-cities_moved")

  divs.value.forEach((el: Element) => {
    el.classList.remove("selected-cities__city_selected")
  })
  selCity.value = null
  selCityInitial.value = null
}

function drag(e: MouseEvent | TouchEvent) {
  let yPos = startY.value;
  if (e instanceof MouseEvent) {
    yPos = e.clientY  
  } else if (e instanceof TouchEvent) {
    yPos = e.touches[0].clientY  
  }
  const dY = yPos - startY.value
  const dPos = Math.trunc(dY/elHeight.value)
  if (selCity.value !== null && selCityInitial.value !== null) {
    selCity.value = clamp(selCityInitial.value + dPos, 0, divs.value.length-1)
  }
}

function deleteHandler(i: number) {
  elHeight.value = divs.value[i].getBoundingClientRect().height
  emit('deletecity', i)
}
</script>

<template>
  <div 
    class="selected-cities"
    @mouseup="dragEnd"
    @touchend="dragEnd"
  >
    <h1 class="selected-cities__title">Settings</h1>
    <div 
      ref="container"
      class="selected-cities__container"
      :style="`height:${containerHeight}px;`" 
    >
      <TransitionGroup name="fade" tag="div"> 
        <div 
          v-if="!selected?.length"
          class="selected-cities__no-city"
          key="no-city"
        >
          <span>No city selected</span>
        </div>
        <div 
          class="selected-cities__city-wrapper"
          v-for="(city, i) in selected"
          :key="city"
          :ref="(
            // @ts-ignore
            (el) => { if (el) divs[i] = el as Element}
          )"
        >
          <div class="selected-cities__city">
            <IconHamburger
              class="selected-cities__dragger"
              @mousedown="(
                // @ts-ignore
                (e: MouseEvent) => dragStart(e, i)
              )"
              @touchstart.passive="(
                // @ts-ignore
                (e: TouchEvent) => dragStart(e, i)
              )"
            />
            <span>{{cityName(city)}}</span>
            <IconTrash 
              class="selected-cities__delete"
              @click="deleteHandler(i)"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.selected-cities__no-city {
  padding: 0 5px;
  padding-bottom: 5px;
  font-style: italic;
  color: hsl(0, 0%, 60%);
}
.selected-cities__title {
  padding: 0 5px;
  font-size: 16px;
  color: hsl(0, 0%, 40%);
}
.selected-cities_moved {
  cursor: move;
}
.selected-cities__city {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  user-select: none;
  border: 1px solid #d2dbf9;
  border-radius: 5px;
}
.selected-cities__city-wrapper {
  padding: 5px 0;
  width: 100%;
}
.selected-cities__city_selected {
  opacity: 0.5;
}
.selected-cities__dragger {
  color: hsl(0, 0%, 40%);
  cursor: move;
}
.selected-cities__delete {
  margin-left: auto;
  color: hsl(0, 0%, 40%);
  cursor: pointer;
}
.selected-cities__container {
  position: relative;
  transition: height 0.5s ease;
}

/* declare transition */
.fade-move {
  transition: all 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01);
}

.fade-leave-active {
  position: absolute;
}
</style>
