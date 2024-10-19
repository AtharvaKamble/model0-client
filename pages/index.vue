<template>
  <section class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-8xl font-bold text-gray-900 mb-4">
        {{ appName }}
      </h1>
      <p class="text-xl text-gray-600">
        {{ description }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
const appName = ref('Model0');
const description = ref('some description')

export default {


  setup() {
    return {
        appName,
      description
    }
  }
}

</script>