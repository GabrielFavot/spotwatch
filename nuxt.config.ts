// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {},
  runtimeConfig: {
    public: {
      hostname: 'http://localhost:3000',
    },
    spotify: {
      redirectUri: '/api/auth/callback',
      clientId: '',
      clientSecret: '',
      refreshToken: '',
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
