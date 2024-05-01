// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {},
  runtimeConfig: {
    public: {
      clientId: process.env.NUXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NUXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    },
  },

  modules: [
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
