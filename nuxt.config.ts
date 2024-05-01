// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  postcss: {},
  runtimeConfig: {
    spotify: {
      clientId: '',
      clientSecret: '',
    }
  },

  modules: ['@nuxtjs/tailwindcss'],
});
