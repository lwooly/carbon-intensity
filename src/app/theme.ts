import { createTheme, responsiveFontSizes } from '@mui/material';

const renderTheme = (isDark: boolean) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#90caf9' : '#1976d2', // Light Blue for dark mode, Darker Blue for light mode
        light: '#63a4ff', // Lighter shade for hover or lighter contexts
        dark: '#115293', // Darker shade for active or pressed buttons
        contrastText: isDark ? '#000' : '#fff', // Ensuring text is visible on primary color
      },
      secondary: {
        main: '#30a76f', // greens
        light: '#d5f2e6',
        dark: '#207867',
        contrastText: isDark ? '#fff' : '#000', // Ensuring text is visible on secondary color
      },
      background: {
        default: isDark ? '#121212' : '#f7f9fc', // A darker shade for dark mode that's less harsh than pure black
        paper: isDark ? '#1e1e1e' : '#fff', // Used for elements like cards and sheets of paper
      },
      text: {
        primary: isDark ? '#fff' : '#000', // Main text color
        secondary: isDark ? '#b3b3b3' : '#4f4f4f', // Secondary text color, less emphasis
      },
    },
    // Other theme customizations...

    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#121212' : '#f7f9fc',
            color: isDark ? '#fff' : '#000',
          },
        },
      },
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
