import React, { useEffect } from "react";
import Homepage from "./pages/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import RGPD from "./pages/RGPD";
import Termos from "./pages/Termos";
import { useLocation } from "react-router-dom";
import Acessibilidade from "./pages/Acessibilidade";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { canonicalPath, SITE_URL } from "./seo";

const loadFontAwesome = () => {
    const kitId = import.meta.env.VITE_FONTAWESOME_KIT_KEY;
    if (!kitId) return;

    const script = document.createElement("script");
    script.src = `https://kit.fontawesome.com/${kitId}.js`;
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
};

function App() {
    const location = useLocation();

    useEffect(() => {
        const path = canonicalPath(location.pathname);
        const existing = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        const sharingUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
        if (!path) {
            existing?.remove();
            sharingUrl?.remove();
            return;
        }
        const link = existing ?? document.createElement("link");
        link.rel = "canonical";
        link.href = SITE_URL + path;
        if (!existing) document.head.appendChild(link);
        const meta = sharingUrl ?? document.createElement("meta");
        meta.setAttribute("property", "og:url");
        meta.content = SITE_URL + path;
        if (!sharingUrl) document.head.appendChild(meta);
    }, [location.pathname]);

    useEffect(() => {
        loadFontAwesome();
    }, []);

    return (
        <>
            <ScrollProgress />
            <Header />

            <main
                id="main"
                className="flex flex-col gap-4 min-h-full w-full overflow-clip"
            >
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/rgpd" element={<RGPD />} />
                    <Route path="/termos" element={<Termos />} />
                    <Route
                        path="/acessibilidade"
                        element={<Acessibilidade />}
                    />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
