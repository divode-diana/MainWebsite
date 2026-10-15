import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/globals.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { canonicalPath } from './seo';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'react-hot-toast';

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// Preserve bookmarks from the previous hash-based router, including section anchors.
if (window.location.hash.startsWith('#/')) {
    const legacy = new URL(window.location.hash.slice(1), window.location.origin);
    const path = canonicalPath(legacy.pathname);
    if (path) window.history.replaceState(null, '', path + legacy.search + legacy.hash);
} else {
    const path = canonicalPath(window.location.pathname);
    if (path && path !== window.location.pathname) {
        window.history.replaceState(null, '', path + window.location.search + window.location.hash);
    }
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Toaster/>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
