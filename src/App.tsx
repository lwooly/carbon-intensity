import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './features/layout/Layout';
import renderTheme from './app/theme';
import NotFound from './components/NotFound';
import { useAppSelector } from './app/hooks';

function App() {
  const isDark: boolean = useAppSelector((state) => state.appStyles.darkMode);
  const theme = renderTheme(isDark);

  // console.log(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
