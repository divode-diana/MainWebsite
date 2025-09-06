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
        <section className="mt-5rem mt-md-10 d-flex flex-column gap-4 maxw-md-80 mx-auto px-4 px-md-0">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </section>
    );
};

export default Acessibilidade;
