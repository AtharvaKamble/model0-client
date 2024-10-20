<template>
  <section
      class="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
      @mousemove="handleMouseMove"
      ref="container"
  >
    <div
        class="absolute inset-0 pointer-events-none"
        :style="gradientStyle"
    ></div>
    <div class="text-center relative z-10">
      <h1
          class="text-9xl font-bold text-gray-900 mb-4 transition-all duration-300 ease-in-out"
          :style="{ letterSpacing: letterSpacing + 'px' }"
      >
        {{ appName }}
      </h1>
      <p class="text-xl text-gray-600">
        {{ description }}
      </p>
      <div class="mt-10 flex justify-center gap-4">
        <NuxtLink to="/login">
          <Button filled>
            Take me to dashboard
          </Button>


        </NuxtLink>
        <NuxtLink to="/signup">
          <Button >
            I'm new to model-0
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Button from '@/components/Button.vue'

const appName = ref('model-0');
const description = ref('MLaaS platform to train and tune your ML, GPT models and use them in your applications ASAP');

const container = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const letterSpacing = ref(0);

const animationFrame = ref(0);

function animate() {
  const time = Date.now() / 1000;
  letterSpacing.value = Math.sin(time) * 10;
  animationFrame.value = requestAnimationFrame(animate);
}

onMounted(() => {
  animationFrame.value = requestAnimationFrame(animate);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame.value);
});

function handleMouseMove(event: MouseEvent) {
  if (container.value) {
    const rect = container.value.getBoundingClientRect();
    mousePosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}

const gradientStyle = computed(() => {
  const { x, y } = mousePosition.value;
  return {
    background: `radial-gradient(600px at ${x}px ${y}px, rgba(68, 50, 168, 0.1), transparent 80%)`
  };
});
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f3f4f6;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

h1 {
  animation: float 6s ease-in-out infinite;
}

button {
  transition: all 0.3s ease;
}
</style>