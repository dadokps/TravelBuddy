import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      400: '#4A6FA5', // Your main color
      500: '#3A5A8A', // Darker shade
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'lg', // Rounded corners
      },
    },
  },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}