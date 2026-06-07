import { useRef } from "react";
import { MagneticButton } from "../../components/MagneticButton";
import { useGSAP } from "@gsap/react";
import { MouseIcon, setupMouse, setupButtonFloat } from "./animations";
import { TRANSLATIONS } from "../../constants/translations";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const LandingSection = ({ content }: Props) => {
    const mouseWrapRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        setupMouse(mouseWrapRef.current);
        setupButtonFloat(btnRef.current);
    });

    return (
        <section
            id="landing"
            className="relative z-10 flex flex-col gap-4 items-center justify-between h-screen w-full max-w-[min(1700px,90vw)] mx-auto p-3 pt-4 lg:p-5! lg:pb-10! overflow-hidden"
        >
            <div></div>
            <div className="flex flex-col gap-7 md:gap-5 mt-4">
                <h2 className="landing-item text-[40px]/15 md:text-[60px]/20 lg:text-[80px]/20 font-advent sm:max-w-2/3">
                    {content.landing.title}
                </h2>
                <p
                    className="landing-item mb-0 sm:max-w-2/3 text-sm md:text-base"
                    dangerouslySetInnerHTML={{
                        __html: content.landing.subtitle,
                    }}
                ></p>
                <div ref={btnRef}>
                    <MagneticButton
                        to="./#contacts"
                        smooth
                        className="landing-item btn btn-primary mx-auto md:ms-auto mt-10 md:mt-0 md:me-40"
                    >
                        {content.landing.cta}
                    </MagneticButton>
                </div>
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
