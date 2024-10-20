<template>
  <div
      class="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
      @mousemove="handleMouseMove"
      ref="container"
  >
    <div
        class="absolute inset-0 pointer-events-none"
        :style="gradientStyle"
    ></div>
    <div class="w-full max-w-md relative z-10">
      <div :class="['bg-white shadow-md rounded-lg px-8 py-6 transition',
        isFormFocused ? 'scale-105' : 'border-gray-300'
      ]">
        <h2 class="text-xl font-semibold text-center mb-6">Sign Up</h2>

        <form @submit.prevent="handleSignUp">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
                id="email"
                v-model="email"
                type="email"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-300"
                placeholder="Enter your email"
                required
                @focus="handleFocus"
                @blur="handleBlur"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-neutral-500"
                placeholder="Create a password"
                required
                @focus="handleFocus"
                @blur="handleBlur"
            />
          </div>

          <div class="mb-6">
            <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-neutral-500"
                placeholder="Confirm your password"
                required
                @focus="handleFocus"
                @blur="handleBlur"
            />
          </div>

          <button
              type="submit"
              class="w-full bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-neutral-600 focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </form>

        <p class="text-center mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:text-blue-700">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const container = ref(null);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isFormFocused = ref(false);
const mousePosition = ref({ x: 0, y: 0 });

function handleFocus() {
  isFormFocused.value = true;
}

function handleBlur() {
  isFormFocused.value = false;
}

function handleMouseMove(event) {
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
    background: `radial-gradient(600px at ${x}px ${y}px, rgba(4, 89, 42, 0.15), transparent 80%)`
  };
});

const handleSignUp = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  console.log('Sign up attempted', {  email: email.value, password: password.value });

  // router.push('/dashboard');
};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f3f4f6;
}
</style>