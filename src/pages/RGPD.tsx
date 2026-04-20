import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import Icon from "../components/shared/Icon";
import { HashLink } from "react-router-hash-link";
import { LANGUAGES } from "../constants/enums";

const RGPD = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];

    return (
        <section className="my-20 flex flex-col gap-4 md:max-w-[80vw] mx-auto px-4 md:px-0">
            <Link
                to={"/"}
                className="flex gap-1 text-sm items-baseline no-underline"
            >
                <Icon icon={"chevron-left"} />{" "}
                <span className="underline">
                    {content.rgpd_terms.back}
                </span>
            </Link>

            <div className="flex flex-col gap-4">
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
