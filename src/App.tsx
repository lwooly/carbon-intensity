import { CssBaseline } from "@mui/material"
import Home from "./pages/Home"
import Layout from "./features/layout/Layout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" index element={<Home/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
