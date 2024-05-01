export default defineTask({
  meta: {
    name: 'spotify:auth',
    description: 'Authenticate with Spotify',
  },
  async run() {
    const runtimeConfig = useRuntimeConfig()
    const appConfig = useAppConfig()
    const { clientId, redirectUri } = runtimeConfig.spotify
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: encodeURI(runtimeConfig.public.hostname + redirectUri),
      scope: appConfig.spotify.scopes.join(' '),
    })

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`

    console.log('Open this URL in your browser:', authUrl)

    return {
      result: { authUrl },
    }
  },
})
