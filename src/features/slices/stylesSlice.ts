import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const stylesSlice = createSlice({
  name: 'appStyles',
  initialState: {
    padding: {
      xs: 3,
      sm: 3,
      md: 3,
      lg: 4,
      xl: 5,
    },
    margin: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
    darkMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
  },
});

// reducer
export default stylesSlice.reducer;
// actions
export const { toggleDarkMode } = stylesSlice.actions;
// selectors
export const selectAllStyles = (state: RootState) => state.appStyles;
