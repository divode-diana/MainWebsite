import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Icon from "./components/Icon";
import { Button } from "react-bootstrap";
import RGPD from "./pages/RGPD";
import Termos from "./pages/Termos";
import { LANGUAGES } from "./constants/enums";
import { useLanguage } from "./context/LanguageContext";
import { TRANSLATIONS } from "./constants/translations";

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
    const { language, toggleLanguage } = useLanguage();
    const content = TRANSLATIONS[language];

    useEffect(() => {
        loadFontAwesome();
    }, []);

    return (
        <>
            <div className="z-1 w-100 d-flex justify-content-center position-absolute top-0 mt-4">
                <header className="d-flex align-items-center justify-content-between h-30px h-md-50px maxw-md-80 w-100 px-4 px-md-0">
                    <HashLink smooth to={"./#landing"}>
                        <h1>
                            <img
                                src={"./divode_logo.png"}
                                alt="Divode escrito em branco"
                                className="h-30px h-md-50px w-auto"
                            />
                        </h1>
                    </HashLink>
                    <nav>
                        <Button
                            variant="Link"
                            onClick={toggleLanguage}
                            className="d-flex align-items-center gap-2"
                        >
                            {language === LANGUAGES.pt ? "EN" : "PT"}
                            <img
                                src={
                                    language === LANGUAGES.pt
                                        ? "./flag/GB.svg"
                                        : "./flag/PT.svg"
                                }
                                alt="language flag"
                                className="h-15px w-auto"
                            />
                        </Button>
                    </nav>
                </header>
            </div>

            <main>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/rgpd" element={<RGPD />} />
                    <Route path="/termos" element={<Termos />} />
                </Routes>
            </main>

            <footer className="w-100 mt-5 d-flex flex-column align-items-center gap-4 mb-4">
                <div className="d-flex gap-5 fs-2">
                    <a
                        href="mailto:info@divode.io"
                        className="email"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon icon="envelope" />
                    </a>
                    <Link
                        to={"https://www.linkedin.com/in/dianafonte/"}
                        target="_blank"
                    >
                        <Icon icon="linkedin" type="brands" />
                    </Link>
                </div>
                <p className="fs-8 m-0">{content.footer.copyright}</p>
                <div className="d-flex flex-column flex-md-row gap-4 align-items-center fs-8">
                    <Link to={"/rgpd"}>{content.footer.rgpd}</Link>
                    <Link to={"/termos"}>{content.footer.termos}</Link>
                </div>
            </footer>
        </>
    );
}

export default App;
