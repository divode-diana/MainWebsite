import React, { useEffect } from "react";
import Homepage from "./pages/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import RGPD from "./pages/RGPD";
import Termos from "./pages/Termos";
import { useLocation } from "react-router-dom";
import Acessibilidade from "./pages/Acessibilidade";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

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
        loadFontAwesome();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
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
