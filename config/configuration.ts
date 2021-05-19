export const configuration = () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: +process.env.PORT || 3000,
    jumblerUrl: process.env.JUMBLER_URL,
    spotifyApi: {
      apiUrl: process.env.SPOTIFY_API_URL,
      accountsUrl: process.env.SPOTIFY_ACCOUNTS_URL,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  };
};
