export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  devtools: { enabled: true },
  nuxtDrizzleZodGen: {
    debug: true,
  },
  css: ['./assets/css/main.css'],
})
