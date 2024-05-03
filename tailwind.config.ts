import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1db954',
          dark: '#212121',
          darker: '#121212',
          gray: '#535353',
          lightgray: '#b3b3b3',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
