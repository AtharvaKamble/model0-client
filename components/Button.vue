<template>
    <button
        :class="[
        'px-6 py-3 rounded-lg transition font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1',
        filled
          ? 'bg-neutral-800 text-white hover:bg-neutral-700'
          : 'bg-white text-neutral-800 border-2 border-neutral-800 hover:bg-neutral-100'
      ]"
    >
      <slot></slot>
    </button>
</template>

<script setup>

defineProps({
  filled: {
    type: Boolean,
    default: false
  }
})

</script>