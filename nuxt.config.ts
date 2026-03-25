// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    redisUrl: 'redis://localhost:6379',
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

  app: {
    head: {
      title: 'Spotify Grid',
      link: [{ rel: 'icon', type: 'ico', href: '/favicon.ico' }],
    },
  },

  nitro: {
    preset: 'node-server',
    experimental: {
      tasks: true,
    },
    devStorage: {
      cache: {
        driver: 'memory',
      },
    },
    storage: {
      cache: {
        driver: 'memory',
      },
    },
    routeRules: {
      '/api/me/currently-playing-track': { cache: { maxAge: 5 } },
      '/api/me/history': { cache: { maxAge: 60 * 15 } },
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
