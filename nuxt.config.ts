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
<<<<<<< Updated upstream
        driver: 'memory',
=======
        driver: 'fs',
        base: './data',
>>>>>>> Stashed changes
      },
    },
    storage: {
      default: {
        driver: 'netlifyBlobs',
<<<<<<< Updated upstream
        name: 'default',
=======
        name: 'spotiwatch',
>>>>>>> Stashed changes
      },
    },
    routeRules: {
      '/api/me/currently-playing-track': { cache: { maxAge: 5 } },
    },
    scheduledTasks: {
      '*/5 * * * *': 'history:refresh',
    },
  },

  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/image', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    domains: ['i.scdn.co'],
  },
});
