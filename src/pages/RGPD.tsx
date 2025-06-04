import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import Icon from "../components/Icon";

const RGPD = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];

    return (
        <section className="mt-5rem mt-md-10 d-flex flex-column gap-4 maxw-md-80 mx-auto px-4 px-md-0">
            <Link to={"/"} className="d-flex gap-1 fs-6 align-items-baseline text-decoration-none">
                <Icon icon={"chevron-left"} /> <span className="text-decoration-underline">{content.rgpd_terms.back}</span>
            </Link>

            <div className="d-flex flex-column gap-4 ">
                <h2>{content.rgpd_terms.rgpd?.title}</h2>
                <p
                    dangerouslySetInnerHTML={{
                        __html: content.rgpd_terms.rgpd.texto,
                    }}
                />
            </div>
        </section>
    );
};

export default RGPD;
