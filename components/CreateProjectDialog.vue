<template>
  <Dialog :visible="props.visible" @update:visible="$emit('update:visible', $event)" modal :header="props.header" class="bg-white" :style="{ width: '25rem' }">
    <slot></slot>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: Boolean,
  header: String
})

defineEmits(['update:visible']);
</script>
