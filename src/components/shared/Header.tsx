import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLanguage } from "../../context/LanguageContext";
import { TRANSLATIONS } from "../../constants/translations";
import { HashLink } from "react-router-hash-link";
import { LANGUAGES } from "../../constants/enums";

const Header = () => {
    const { language, toggleLanguage } = useLanguage();
    const content = TRANSLATIONS[language];
    const navRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 80;

            gsap.to(navRef.current, {
                yPercent: scrollingDown ? -150 : 0,
                duration: 0.35,
                ease: "power2.out",
            });

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    });

    return (
        <header className="flex justify-center">
            <div
                title="skip to main content"
                className="absolute top-0 w-full flex justify-center z-50"
            >
                <HashLink
                    smooth
                    to={"./#main"}
                    className="w-fit rounded-b py-3 px-4 bg-white opacity-0 focus:opacity-100"
                >
                    {content.skipToMain}
                </HashLink>
            </div>

            <nav ref={navRef} className="nav w-full max-w-[min(1700px,90vw)] mx-auto z-50 flex justify-center items-center fixed top-0 mt-3 md:mt-4">
                <ul className="flex items-center justify-between w-full m-0">
                    <li>
                        <HashLink smooth to={"/#landing"}>
                            <h1 className="my-1 flex">
                                <img
                                    src="./divode_logo_color.svg"
                                    alt={content.header.logo}
                                    className="h-13 w-auto"
                                />
                            </h1>
                        </HashLink>
                    </li>
                    <div className="flex gap-2">
                        <li className="hidden md:block">
                            <HashLink
                                smooth
                                to={"/#contacts"}
                                className="no-underline btn btn-primary text-[0.85rem]"
                            >
                                {content.header.cta}
                            </HashLink>
                        </li>
                        <li>
                            <button
                                onClick={toggleLanguage}
                                className="btn btn-outline-primary flex items-center gap-2 text-[0.85rem] h-full"
                            >
                                {language === LANGUAGES.pt ? "EN" : "PT"}
                                <img
                                    src={
                                        language === LANGUAGES.pt
                                            ? "./flag/GB.svg"
                                            : "./flag/PT.svg"
                                    }
                                    alt="language flag"
                                    className="h-3.75 w-auto"
                                />
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
