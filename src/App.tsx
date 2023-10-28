import { CssBaseline } from "@mui/material"
import Home from "./pages/Home"
import Layout from "./features/layout/Layout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material"



function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#FFF',
      },
      secondary: {
        main: '#30a76f',
        light: '#d5f2e6',
        dark: '#207867'
      },
      background: {
        default: '#f7f9fc'
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
  theme = responsiveFontSizes(theme)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" index element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
