import {
  CssBaseline, createTheme, ThemeProvider, responsiveFontSizes,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Layout from './features/layout/Layout';
import { renderTheme } from './app/theme';

function App() {
  const isDark = useSelector((state) => state.appStyles.darkMode);
  const theme = renderTheme(isDark);

  // console.log(theme)

  return (
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
  );
}

export default App;
