<script setup lang="ts">
import { computed } from 'vue'
import Icon01d from './icons/Icon01d.vue'
import Icon01n from './icons/Icon01n.vue'
import Icon02d from './icons/Icon02d.vue'
import Icon02n from './icons/Icon02n.vue'
import Icon03d03n from './icons/Icon03d03n.vue'
import Icon04d04n from './icons/Icon04d04n.vue'
import Icon09d09n from './icons/Icon09d09n.vue'
import Icon10d from './icons/Icon10d.vue'
import Icon10n from './icons/Icon10n.vue'
import Icon11d11n from './icons/Icon11d11n.vue'
import Icon13d13n from './icons/Icon13d13n.vue'
import Icon50d50n from './icons/Icon50d50n.vue'

const props = defineProps<{
  iconId: string
}>()

const icon = computed(() => {
	switch (props.iconId) {
		case '01d':
			return Icon01d
		case '01n':
			return Icon01n
		case '02d':
			return Icon02d
		case '02n':
			return Icon02n
		case '03d':
		case '03n':
			return Icon03d03n
		case '04d':
		case '04n':
			return Icon04d04n
		case '09d':
		case '09n':
			return Icon09d09n
		case '10d':
			return Icon10d
		case '10n':
			return Icon10n
		case '11d':
		case '11n':
			return Icon11d11n
		case '13d':
		case '13n':
			return Icon13d13n
		case '50d':
		case '50n':
			return Icon50d50n
	}
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
