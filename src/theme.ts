import { createTheme } from '@mui/material';

export const lightThemeOption = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#199825',
      light: '#aade75',
    },
    secondary: {
      main: '#a4265d',
    },
    background: {
      default: '#d5d5d5',
      paper: '#e5e5e5',
    },
  },
});

export const darkThemeOption = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#199825',
      light: '#aade75',
    },
    secondary: {
      main: '#a4265d',
    },
  },
});
