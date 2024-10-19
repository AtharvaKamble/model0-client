<template>
  <section class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-900 mb-4">
        {{ appName }}
      </h1>
      <p class="text-xl text-gray-600">
        {{ description }}
      </p>
      <div class="mt-10 flex justify-center gap-2">
        <NuxtLink to="/login" >
          <button class="px-4 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition font-bold">take me to dashboard</button>
        </NuxtLink>

        <NuxtLink to="/signup" >
        <button class="px-4 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition font-bold">i am new to model-0</button>

        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
const appName = ref('model-0');
const description = ref('MLaaS platform to train and tune your ML, GPT models and use them in your applications ASAP')

export default {


  setup() {
    return {
        appName,
      description
    }
  }
}

</script>