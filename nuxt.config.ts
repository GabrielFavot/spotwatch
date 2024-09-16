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
    preset: 'netlify',
    experimental: {
      tasks: true,
    },
    devStorage: {
      spotify: {
        driver: 'fs',
        base: '.nuxt/.data',
      },
      cache: {
        driver: 'memory',
      },
    },
    storage: {
      spotify: {
        driver: 'netlifyBlobs',
        name: 'spotify-grid',
        siteID: process.env.NETLIFY_SITE_ID,
        token: process.env.NETLIFY_API_TOKEN,
      },
      cache: {
        driver: 'memory',
        name: 'cache',
      },
    },
    routeRules: {
      '/api/me/currently-playing-track': { cache: { maxAge: 5 } },
      '/api/me/history': { cache: { maxAge: 60 * 15 } },
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
