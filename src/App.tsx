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
import { useLocation } from "react-router-dom";

const loadFontAwesome = () => {
    const kitId = process.env.REACT_APP_FONTAWESOME_KIT_KEY;
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
    const location = useLocation();

    useEffect(() => {
        loadFontAwesome();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <header className="d-flex justify-content-center">
                <div
                    title="skip to main content"
                    className="position-absolute top-0 w-100 d-flex justify-content-center"
                >
                    <HashLink
                        smooth
                        to={"./#main"}
                        className="w-fit-content rounded-bottom py-3 px-4 bg-white opacity-0 opacity-focus-1"
                    >
                        {content.skipToMain}
                    </HashLink>
                </div>

                <nav className="maxw-md-80 z-1 w-100 d-flex justify-content-center position-absolute top-0 mt-4">
                    <ul className="d-flex align-items-center justify-content-between w-100 h-30px h-md-50px px-4 px-md-0">
                        <li>
                            <HashLink smooth to={"./#landing"}>
                                <h1>
                                    <img
                                        src={
                                            location.pathname === "/rgpd" ||
                                            location.pathname === "/termos"
                                                ? "./logo_color.png"
                                                : "./divode_logo.png"
                                        }
                                        alt="Divode - Criação de sites e design gráfico"
                                        className="h-30px h-md-50px w-auto"
                                    />
                                </h1>
                            </HashLink>
                        </li>
                        <li>
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
                        </li>
                    </ul>
                </nav>
            </header>

            <main
                id="main"
                className="d-flex flex-column gap-4 minh-100 w-100 overflow-clip"
            >
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/rgpd" element={<RGPD />} />
                    <Route path="/termos" element={<Termos />} />
                </Routes>
            </main>

            <footer className="w-100 mt-5 d-flex flex-column align-items-center gap-4 mb-4 px-4">
                <div className="d-flex gap-5 fs-2">
                    <a
                        href="mailto:info@divode.io"
                        className="email"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Contactar através do email"
                    >
                        <Icon icon="envelope" />
                    </a>
                    <Link
                        to={"https://www.linkedin.com/company/divode"}
                        target="_blank"
                        title="Aceder à página do LinkedIn"
                    >
                        <Icon icon="linkedin" type="brands" />
                    </Link>
                </div>
                <p className="fs-8 m-0 text-center">
                    {content.footer.copyright}
                </p>
                <div className="d-flex flex-column flex-md-row gap-4 align-items-center fs-8">
                    <Link to={"/rgpd"}>{content.footer.rgpd}</Link>
                    <Link to={"/termos"}>{content.footer.termos}</Link>
                </div>
            </footer>
        </>
    );
}

export default App;
