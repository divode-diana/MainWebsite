import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/styles.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
