import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HomePage } from './pages/HomePage/HomePage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import './App.scss';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
