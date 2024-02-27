import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch } from 'react-redux';
import { toggleDarkMode } from '../features/slices/stylesSlice';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
    setIsDark(!isDark);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            Carbon Intensity Dashboard
          </Typography>
          <IconButton color="secondary" onClick={handleToggleDarkMode}>
            {isDark ? (
              <DarkModeIcon sx={{ color: 'secondary.main' }} />
            ) : (
              <LightModeIcon sx={{ color: 'secondary.main' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
