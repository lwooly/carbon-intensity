import { createTheme, responsiveFontSizes } from "@mui/material"
import { useSelector } from "react-redux";

export const renderTheme = (isDark) => {

const theme = createTheme({

    palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: isDark ? '#000' : '#FFF', 
          contrastText: isDark ? '#FFF' : '#000'
        },
        secondary: {
          main: '#30a76f',
          light: '#d5f2e6',
          dark: '#207867'
        },
        background: {
          default: isDark ? '#333' : '#f7f9fc',
        }
      },
    typography: {
      fontFamily: ['"Inter"', 'sans-serif'].join(','),
      h1: {
        fontWeight: 600
      },
      h2: {
        fontWeight: 600
      },
      h3: {
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: 24
    },
  })

 return responsiveFontSizes(theme)

}
