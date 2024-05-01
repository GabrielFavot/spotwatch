// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
    devStorage: {
      default: {
        driver: 'memory',
      },
    },
    storage: {
      default: {
        driver: 'netlifyBlobs',
      },
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
