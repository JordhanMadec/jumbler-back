export const configuration = () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: +process.env.PORT || 3000,
    spotifyApi: {
      baseUrl: process.env.SPOTIFY_API_URL,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
  };
};
