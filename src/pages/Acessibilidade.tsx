import Icon from "@/components/shared/Icon";
import { TRANSLATIONS } from "@/constants/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Acessibilidade = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];
    const [html, setHtml] = useState("");

    useEffect(() => {
        fetch("/accessibility-statement_pt.html")
            .then((res) => res.text())
            .then(setHtml)
            .catch(console.error);
    }, []);

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
            
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
};

export default Acessibilidade;
