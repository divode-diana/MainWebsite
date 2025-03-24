import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [lang, setLang] = useState<LANGUAGES>(localStorage.getItem("lang") 
    ?  localStorage.getItem("lang") === 'pt'
      ? LANGUAGES.pt
      : LANGUAGES.en
    : LANGUAGES.pt
  );

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === LANGUAGES.pt ? LANGUAGES.en : LANGUAGES.pt));
  };

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
  }, [lang])

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