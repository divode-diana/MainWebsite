import { useRef } from "react";
import { HashLink } from "react-router-hash-link";
import { useGSAP } from "@gsap/react";
import { MouseIcon, setupMouse } from "./animations";
import { TRANSLATIONS } from "../../constants/translations";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const LandingSection = ({ content }: Props) => {
    const mouseWrapRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        setupMouse(mouseWrapRef.current);
    });

    return (
        <section
            id="landing"
            className="relative z-10 flex flex-col gap-4 items-center justify-between h-screen w-full max-w-[min(1700px,90vw)] mx-auto p-3 pt-4 lg:p-5! lg:pb-10! overflow-hidden"
        >
            <div></div>
            <div className="flex flex-col gap-4 items-center mt-4">
                <h2 className="landing-item text-[48px] lg:text-[70px] text-center md:w-3/4">
                    {content.landing.title}
                </h2>
                <p
                    className="landing-item m-0 text-center md:w-1/2"
                    dangerouslySetInnerHTML={{
                        __html: content.landing.subtitle,
                    }}
                ></p>
                <HashLink
                    smooth
                    to={"./#contacts"}
                    className="landing-item btn btn-primary py-2 px-4 rounded-md"
                >
                    {content.landing.cta}
                </HashLink>
            </div>
            <div className="landing-item flex flex-col items-center gap-2">
                <p className="mb-0 text-[0.7rem]">{content.landing.scroll}</p>
                <div ref={mouseWrapRef}>
                    <MouseIcon aria-hidden />
                </div>
            </div>
        </section>
    );
};

export default LandingSection;
