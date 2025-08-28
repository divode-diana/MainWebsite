import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import Icon from "../components/Icon";
import { HashLink } from "react-router-hash-link";
import { LANGUAGES } from "../constants/enums";

const RGPD = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];

    return (
        <section className="mt-5rem mt-md-10 d-flex flex-column gap-4 maxw-md-80 mx-auto px-4 px-md-0">
            <Link
                to={"/"}
                className="d-flex gap-1 fs-6 align-items-baseline text-decoration-none"
            >
                <Icon icon={"chevron-left"} />{" "}
                <span className="text-decoration-underline">
                    {content.rgpd_terms.back}
                </span>
            </Link>

            <div className="d-flex flex-column gap-4 ">
                <ul className="my-4 p-0">
                    <li>
                        <HashLink smooth to={"./#privacidade-1"}>
                            {language === LANGUAGES.pt
                                ? "1. Identificação da Entidade Responsável"
                                : "1. Identification of the Responsible Entity"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#privacidade-2"}>
                            {language === LANGUAGES.pt
                                ? "2. Confidencialidade e Proteção de Dados"
                                : "2. Confidentiality and Data Protection"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#privacidade-3"}>
                            {language === LANGUAGES.pt
                                ? "3. Recolha e Utilização de Dados"
                                : "3. Data Collection and Use"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#privacidade-4"}>
                            {language === LANGUAGES.pt
                                ? "4. Direitos dos Titulares dos Dados"
                                : "4. Data Subject Rights"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#privacidade-5"}>
                            {language === LANGUAGES.pt
                                ? "5. Proteção e Segurança dos Dados"
                                : "5. Data Protection and Security"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#privacidade-6"}>
                            {language === LANGUAGES.pt
                                ? "6. Propriedade Intelectual – Conteúdos Protegidos"
                                : "6. Intellectual Property – Protected Content"}
                        </HashLink>
                    </li>
                </ul>

                <p
                    dangerouslySetInnerHTML={{
                        __html: content.rgpd_terms.rgpd,
                    }}
                />
            </div>
        </section>
    );
};

export default RGPD;
