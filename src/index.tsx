import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/globals.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'react-hot-toast';

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <LanguageProvider>
        <Toaster/>
        <App />
      </LanguageProvider>
    </HashRouter>
  </React.StrictMode>
);
