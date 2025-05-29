import React, { useEffect } from 'react';
import Homepage from './pages/Homepage';

const loadFontAwesome = () => {
  const kitId = process.env.REACT_APP_FONTAWESOME_KIT_KEY;
  console.log("FontAwesome Kit ID:", kitId);
  if (!kitId) return;

  const script = document.createElement("script");
  script.src = `https://kit.fontawesome.com/${kitId}.js`;
  script.crossOrigin = "anonymous";
  script.async = true;
  document.body.appendChild(script);
};

function App() {
  useEffect(() => {
    loadFontAwesome();
  }, []);
  
  return <Homepage />
}

export default App;
