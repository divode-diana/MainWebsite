import { Link } from "react-router-dom";

import { TRANSLATIONS } from "../../constants/translations";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];

    return (
        <footer className="w-full max-w-[min(1700px,90vw)] mx-auto mt-5 py-3 flex flex-col-reverse md:flex-row md:justify-between items-center gap-4 mb-4">
            <p className="text-[0.7rem] m-0 text-center">{content.footer.copyright}</p>
            <div className="flex flex-col md:flex-row gap-4 items-center text-[0.7rem]">
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
