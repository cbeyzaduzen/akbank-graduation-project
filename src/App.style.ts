import { blue, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const appStyle = createTheme({
    palette: {
      primary: {
        dark: grey[600],
        main: blue[300],
        light: grey[200],
      },
      secondary: {
        main: grey[100],
      }
    },
  });