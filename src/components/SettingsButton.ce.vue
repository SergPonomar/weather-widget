<script setup lang="ts">
import IconSettings from './icons/IconSettings.vue'
import IconClose from './icons/IconClose.vue'

defineProps<{
  closed?: boolean | string
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

function handler() {
  emit('toggle')
}
</script>

<template>
  <button 
    class="settings-button"
    @click="handler"
  >
    <IconSettings v-if="!closed" />
    <IconClose v-else />
  </button>
</template>

<style>
.settings-button {
  all: unset;
  cursor: pointer;
  color: hsl(0, 0%, 50%);
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 5px;
}
</style>
