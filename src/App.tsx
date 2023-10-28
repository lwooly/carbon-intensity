import { CssBaseline } from "@mui/material"
import Home from "./pages/Home"
import Layout from "./features/layout/Layout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material"
import { useSelector } from "react-redux"
import { renderTheme } from "./app/theme"



function App() {
  const isDark = useSelector(state => state.appStyles.darkMode)

  const theme = renderTheme(isDark) 

  console.log(theme)

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
