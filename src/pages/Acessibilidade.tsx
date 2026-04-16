import { useEffect, useState } from "react";

const Acessibilidade = () => {
    const [html, setHtml] = useState("");

    useEffect(() => {
        fetch("/accessibility-statement_pt.html")
            .then((res) => res.text())
            .then(setHtml)
            .catch(console.error);
    }, []);

    return (
        <section className="mt-[5rem] md:mt-10 flex flex-col gap-4 md:max-w-[80vw] mx-auto px-4 md:px-0">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
};

export default Acessibilidade;
