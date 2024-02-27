import { createTheme, responsiveFontSizes } from '@mui/material';

const renderTheme = (isDark: boolean) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#000' : '#FFF',
        contrastText: isDark ? '#FFF' : '#000',
      },
      secondary: {
        main: '#30a76f',
        light: '#d5f2e6',
        dark: '#207867',
      },
      background: {
        default: isDark ? '#333' : '#f7f9fc',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            margin: '8px', // To give buttons some space
          },
          contained: {
            boxShadow: 'none', // Removing default shadow for a cleaner look
          },
          containedPrimary: {
            backgroundColor: isDark ? '#555' : '#e6e8eb', // Neutral background
            color: isDark ? '#FFF' : '#000', // Contrast text color
            '&:hover': {
              backgroundColor: isDark ? '#777' : '#d1d3d6', // Hover state
            },
          },
          containedSecondary: {
            backgroundColor: isDark ? '#30a76f' : '#207867', // Utilizing your secondary colors
            color: '#FFF', // White text for both light and dark for better contrast
            '&:hover': {
              backgroundColor: isDark ? '#207867' : '#105c47', // Darken on hover
            },
          },
          outlinedPrimary: {
            borderColor: isDark ? '#555' : '#e6e8eb',
            color: isDark ? '#FFF' : '#000',
          },
          outlinedSecondary: {
            borderColor: isDark ? '#30a76f' : '#207867',
            color: isDark ? '#30a76f' : '#207867',
          },
        },
      },
    },
    typography: {
      fontFamily: ['"Inter"', 'sans-serif'].join(','),
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 24,
    },
  });

  return responsiveFontSizes(theme);
};

export default renderTheme;
