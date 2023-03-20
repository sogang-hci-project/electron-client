import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Front from './page/Front';
import Browser from './page/Browser';
import Reader from './page/Reader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

export const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#715f67',
    },
    secondary: {
      main: '#e2d8d8',
    },
    background: {
      default: '#ffffff',
    },
    info: {
      main: '#4e342e',
    },
    success: {
      main: '#668290',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/reader" element={<Reader />} />
          <Route path="/browser" element={<Browser />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
