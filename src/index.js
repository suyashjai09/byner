import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "@carbon/ibm-products/css/index-full-carbon.css";
import { ThemeProvider } from './sdk/theme/ThemeContext';

ReactDOM.render(
  <ThemeProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>,
 document.getElementById('root')
);

