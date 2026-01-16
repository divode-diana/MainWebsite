import { Link } from "react-router-dom";

import { TRANSLATIONS } from "../constants/translations";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];

    return (
        <footer className="w-content mt-5 py-3 d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-center gap-4 mb-5">
            <p className="fs-8 m-0 text-center">{content.footer.copyright}</p>
            <div className="d-flex flex-column flex-md-row gap-4 align-items-center fs-8">
                <Link to={"/rgpd"}>{content.footer.rgpd}</Link>
                <Link to={"/termos"}>{content.footer.termos}</Link>
                <Link to={"/acessibilidade"}>
                    {content.footer.acessibilidade}
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
