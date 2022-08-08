<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import IconSettings from './icons/IconSettings.vue'
import IconClose from './icons/IconClose.vue'

const props = defineProps<{
  closed?: Ref<boolean>
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const isClosed = computed(() => props.closed?.value)

function handler() {
  emit('toggle')
}
</script>

<template>
  <button 
    class="settings-button"
    @click="handler"
  >
    <IconSettings v-if="!isClosed" />
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
