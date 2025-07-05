import React from 'react';
import './App.css';
import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from 'styled-components';
import customTheme from './Theme/customTheme';

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
        </div>
      </ThemeProvider>
  );
}

export default App;
