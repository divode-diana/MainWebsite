import React, { createContext, useContext, useState } from 'react';
import { LANGUAGES } from '../constants/enums';

interface languagesType {
    language: LANGUAGES,
    toggleLanguage: () => void
} 

const LanguageContext = createContext<languagesType>({
    language: LANGUAGES.pt,
    toggleLanguage: () => {}
});

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState<LANGUAGES>(LANGUAGES.pt);

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === LANGUAGES.pt ? LANGUAGES.en : LANGUAGES.pt));
  };

  return (
    <LanguageContext.Provider value={{ language: lang, toggleLanguage: toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
    return useContext(LanguageContext);
};

export { LanguageProvider, useLanguage };