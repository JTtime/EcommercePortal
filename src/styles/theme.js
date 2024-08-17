'use client'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03dac6',
      contrastText: '#000000',
    },
    error: {
      main: '#b00020',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2196f3',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
    },
    drawer: {
      background: '#fafafa',
      color: '#333333',
      paperBackground: '#ffffff',
      primary: '#6200ea',
      secondary: '#03dac6',
    },
    product: {
      background: '#ffffff',
      border: '#e0e0e0',
      hover: '#f5f5f5',
      price: '#4caf50',
      discount: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#6200ea',
          '&:hover': {
            backgroundColor: '#3700b3',
          },
        },
        containedSecondary: {
          backgroundColor: '#03dac6',
          '&:hover': {
            backgroundColor: '#018786',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fafafa',
          color: '#333333',
          width: 240,
          borderRadius: '0 8px 8px 0',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

export default theme;
