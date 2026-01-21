import { Button } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import { HashLink } from "react-router-hash-link";
import { LANGUAGES } from "../constants/enums";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Header = () => {
    const { language, toggleLanguage } = useLanguage();
    const content = TRANSLATIONS[language];

    useGSAP(() => {
        const showAnim = gsap
            .from(".nav", {
                yPercent: -150,
                paused: true,
                duration: 0.2,
            })
            .progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            // markers: true,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse();
            },
        });
    });

    return (
        <header className="d-flex justify-content-center">
            <div
                title="skip to main content"
                className="position-absolute top-0 w-100 d-flex justify-content-center z-5"
            >
                <HashLink
                    smooth
                    to={"./#main"}
                    className="w-fit-content rounded-bottom py-3 px-4 bg-white opacity-0 opacity-focus-1"
                >
                    {content.skipToMain}
                </HashLink>
            </div>

            <nav className="nav w-content z-4 d-flex justify-content-center align-items-center position-fixed top-0 mt-3 mt-md-4 bg-glass-white rounded-pill">
                <ul className="d-flex align-items-center justify-content-between w-100 px-2 py-1 m-0">
                    <div className="d-flex gap-4 align-items-center">
                        <li>
                            <HashLink smooth to={"/#landing"}>
                                <h1 className="my-1 d-flex">
                                    <img
                                        src="./divode_logo_color.svg"
                                        alt={content.header.logo}
                                        className="h-40px w-auto"
                                    />
                                </h1>
                            </HashLink>
                        </li>
                        <div className="d-none d-lg-flex gap-4 align-items-center">
                            <li>
                                <HashLink
                                    smooth
                                    to={"/#services"}
                                    className="text-dark text-dark-red-hover text-decoration-none text-decoration-underline-hover fs-7"
                                >
                                    {content.header.menu.opt1}
                                </HashLink>
                            </li>
                            <li>
                                <HashLink
                                    smooth
                                    to={"/#about"}
                                    className="text-dark text-dark-red-hover text-decoration-none text-decoration-underline-hover fs-7"
                                >
                                    {content.header.menu.opt2}
                                </HashLink>
                            </li>
                            <li>
                                <HashLink
                                    smooth
                                    to={"/#contacts"}
                                    className="text-dark text-dark-red-hover text-decoration-none text-decoration-underline-hover fs-7"
                                >
                                    {content.header.menu.opt3}
                                </HashLink>
                            </li>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <li className="d-none d-md-block">
                            <HashLink
                                smooth
                                to={"/#contacts"}
                                className="text-decoration-none fs-7"
                            >
                                <Button variant="primary">
                                    {content.header.cta}
                                </Button>
                            </HashLink>
                        </li>
                        <li>
                            <Button
                                variant="outline-primary"
                                onClick={toggleLanguage}
                                className="d-flex align-items-center gap-2 fs-7 h-100"
                            >
                                {language === LANGUAGES.pt ? "EN" : "PT"}
                                <img
                                    src={
                                        language === LANGUAGES.pt
                                            ? "./flag/GB.svg"
                                            : "./flag/PT.svg"
                                    }
                                    alt="language flag"
                                    className="h-15px w-auto"
                                />
                            </Button>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
