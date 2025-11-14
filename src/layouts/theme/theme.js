// src/layouts/theme/theme.js
import { createTheme } from '@mui/material/styles'; // Although createTheme isn't used here, it's fine.

// --- Color Palette and Configuration ---
export const colors = {
  // Shared colors
  accent: '#00E5BE',
  accentHover: '#00caa8',
  lucraGold: '#D4AF37',
  errorRed: '#FF4136',
  successGreen: '#2ECC40',
  logoDark: '#1A334A',

  // Dark Mode specific colors (Softer Slate Blue)
  dark: {
    bgTop: '#1A2433',
    bgGradA: '#2A344A',
    bgGradB: '#111827',
    card: '#243040',
    textDim: 'rgba(255,255,255,0.78)',
    textPrimary: '#F0F3F7',
  },

  // Light Mode specific colors (Softer Light Gray/Mint)
  light: {
    bgTop: '#F8F9FA',
    bgGradA: '#E6F4F1',
    bgGradB: '#D8E8E6',
    card: '#FFFFFF',
    textDim: 'rgba(0,0,0,0.65)',
    textPrimary: '#1F2937',
  }
};

// --- Theme Utility Function ---
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: { main: colors.accent },
    secondary: { main: colors.lucraGold },
    error: { main: colors.errorRed },
    success: { main: colors.successGreen },
    background: {
      default: colors[mode].bgTop,
      paper: colors[mode].card,
    },
    text: {
      primary: colors[mode].textPrimary,
      secondary: colors[mode].textDim,
    },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          // Ensure button text color contrasts with accent background
          color: mode === 'dark' ? colors.dark.bgTop : colors.dark.bgTop, // Often dark text looks good on the accent color
        },
      },
    },
    // You might add more component overrides here later
  },
});