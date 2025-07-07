import React from 'react';
import './App.css';
import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from 'styled-components';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          {/* 14:33:39 */}
          <Home />
        </div>
      </ThemeProvider>
  );
}

export default App;
