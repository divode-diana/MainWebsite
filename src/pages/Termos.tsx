import { Link } from "react-router-dom";
import { TRANSLATIONS } from "../constants/translations";
import { useLanguage } from "../context/LanguageContext";
import Icon from "../components/Icon";
import { HashLink } from "react-router-hash-link";
import { LANGUAGES } from "../constants/enums";

const Termos = () => {
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
                        <HashLink smooth to={"./#termos-preambulo"}>
                            {language === LANGUAGES.pt ? "Preâmbulo" : "Preamble"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-1"}>
                            {language === LANGUAGES.pt
                                ? "1. Objeto do Contrato"
                                : "1. Purpose of the Contract"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-2"}>
                            {language === LANGUAGES.pt
                                ? "2. Obrigações e Responsabilidades da DIVODE (Prestador de Serviços)"
                                : "2. Obligations and Responsibilities of DIVODE (Service Provider)"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-3"}>
                            {language === LANGUAGES.pt
                                ? "3. Deveres e Responsabilidades do Cliente/Utilizador dos Serviços"
                                : "3. Duties and Responsibilities of the Client/User of Services"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-4"}>
                            {language === LANGUAGES.pt
                                ? "4. Direitos de Propriedade Intelectual"
                                : "4. Intellectual Property Rights"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-5"}>
                            {language === LANGUAGES.pt
                                ? "5. Limitação de Responsabilidade"
                                : "5. Limitation of Liability"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-6"}>
                            {language === LANGUAGES.pt
                                ? "6. Preços, Faturação e Condições de Pagamento"
                                : "6. Prices, Billing, and Payment Conditions"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-7"}>
                            {language === LANGUAGES.pt
                                ? "7. Condições Específicas para Desenvolvimento de Websites"
                                : "7. Conditions Specific to Website Development"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-8"}>
                            {language === LANGUAGES.pt
                                ? "8. Comunicações Não Solicitadas e Atividades Ilícitas"
                                : "8. Unsolicited Communications and Illegal Activities"}
                        </HashLink>
                    </li>
                    <li>
                        <HashLink smooth to={"./#termos-9"}>
                            {language === LANGUAGES.pt
                                ? "9. Disposições Finais, Cancelamento e Resolução Contratual"
                                : "9. Final Provisions, Cancellation, and Contract Termination"}
                        </HashLink>
                    </li>
                </ul>

                <p
                    dangerouslySetInnerHTML={{
                        __html: content.rgpd_terms.terms,
                    }}
                />
            </div>
        </section>
    );
};

export default Termos;
