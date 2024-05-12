// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
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

  app: {
    head: {
      title: 'Spotify Grid',
      link: [{ rel: 'icon', type: 'ico', href: '/favicon.ico' }],
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
      history: {
        driver: 'fs',
        base: './data/history',
      },
    },
    storage: {
      default: {
        driver: 'netlifyBlobs',
      },
      history: {
        driver: 'netlifyBlobs',
      },
    },
    routeRules: {
      '/api/me/history': { cache: { maxAge: 60 * 3 } },
      '/api/me/currently-playing-track': { cache: { maxAge: 5 } },
    },
    scheduledTasks: {
      '* * * * *': 'history:refresh',
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/image', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  image: {
    domains: ['i.scdn.co'],
  },
});
