<script setup lang="ts">
import { computed } from 'vue'
import IconN01d from './icons/IconN01d.vue'
import IconN01n from './icons/IconN01n.vue'
import IconN02d from './icons/IconN02d.vue'
import IconN02n from './icons/IconN02n.vue'
import IconN03d03n from './icons/IconN03d03n.vue'
import IconN04d04n from './icons/IconN04d04n.vue'
import IconN09d09n from './icons/IconN09d09n.vue'
import IconN10d from './icons/IconN10d.vue'
import IconN10n from './icons/IconN10n.vue'
import IconN11d11n from './icons/IconN11d11n.vue'
import IconN13d13n from './icons/IconN13d13n.vue'
import IconN50d50n from './icons/IconN50d50n.vue'

const props = defineProps<{
  iconId: string
}>()

const icon = computed(() => {
	switch (props.iconId) {
		case '01d':
			return IconN01d
		case '01n':
			return IconN01n
		case '02d':
			return IconN02d
		case '02n':
			return IconN02n
		case '03d':
		case '03n':
			return IconN03d03n
		case '04d':
		case '04n':
			return IconN04d04n
		case '09d':
		case '09n':
			return IconN09d09n
		case '10d':
			return IconN10d
		case '10n':
			return IconN10n
		case '11d':
		case '11n':
			return IconN11d11n
		case '13d':
		case '13n':
			return IconN13d13n
		case '50d':
		case '50n':
			return IconN50d50n
	}
	return IconN02d
}) 
</script>

<template>
  <component 
    :is="icon" 
    class="tab"
  />
</template>

<style>
</style>
