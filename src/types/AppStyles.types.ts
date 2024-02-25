export interface Padding {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Margin {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface AppStylesState {
  padding: Padding;
  margin: Margin;
  darkMode: boolean;
}
