// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import Nora from '@primevue/themes/nora'
import umd from '@primevue/themes/umd'
import lara from '@primevue/themes/lara'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    /* Configuration */
    options: {
      theme: {
        preset: Nora
      }
    }
  }
})
