import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactComponent as PenIcon } from "../../assets/services/pen.svg";
import { ReactComponent as ObjectIcon } from "../../assets/services/object.svg";
import { ReactComponent as ScrewdriverIcon } from "../../assets/services/screwdriver.svg";
import { ReactComponent as PaletteIcon } from "../../assets/services/palette.svg";
import { ReactComponent as CodeIcon } from "../../assets/services/code.svg";
import { ReactComponent as WifiIcon } from "../../assets/services/wifi.svg";
import { TRANSLATIONS } from "../../constants/translations";
import { LANGUAGES } from "../../constants/enums";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = [
    PenIcon,
    ObjectIcon,
    ScrewdriverIcon,
    PaletteIcon,
    CodeIcon,
    WifiIcon,
];

const serviceColors = [
    "#CF0501",
    "#138184",
    "#88735A",
    "#2EBCE4",
    "#0678C5",
    "#1C4263",
];

type Props = {
    content: (typeof TRANSLATIONS)[number];
    language: LANGUAGES;
};

const ServicesSection = ({ content, language }: Props) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const cards = Array.from(
                sectionRef.current?.querySelectorAll<HTMLElement>(
                    ".service-card",
                ) ?? [],
            );
            if (!cards.length) return;

            // All cards start hidden below the screen
            gsap.set(cards, { y: "110vh", yPercent: -50 });

            // Each card takes 1 unit of scroll; total = cards.length units
            const cardDuration = 1;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${cards.length * window.innerHeight}`,
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            cards.forEach((card, i) => {
                const rotation = gsap.utils.random(-4, 4);
                tl.to(card, {
                    y: i * 75,
                    rotation,
                    duration: cardDuration,
                    ease: "power3.out",
                });
            });

            // SM only: fade out text while first card scrolls to centre
            gsap.matchMedia().add("(max-width: 767px)", () => {
                gsap.fromTo(
                    textRef.current,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: () => `+=${window.innerHeight * 0.5}`,
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    },
                );
            });
        },
        { scope: sectionRef, dependencies: [language], revertOnUpdate: true },
    );

    return (
        <section
            id="services"
            ref={sectionRef}
            className="w-full h-screen flex flex-col md:flex-row justify-between items-center pt-20 md:py-0 max-w-[min(1700px,90vw)] mx-auto z-20"
        >
            <div
                ref={textRef}
                className="flex flex-col gap-4 md:gap-8 w-full md:w-2/5 p-10!"
                data-aos="fade-up"
            >
                <h3
                    className="text-3xl md:text-5xl mb-0 text-center md:text-left"
                    dangerouslySetInnerHTML={{
                        __html: content.services.bottomText,
                    }}
                />

                <p
                    className="text-center md:text-left"
                    dangerouslySetInnerHTML={{
                        __html: content.services.topText,
                    }}
                ></p>
            </div>

            <div className="absolute inset-0 pointer-events-none md:relative w-full md:w-3/5 md:self-stretch">
                {content.services.list.map((service, index) => {
                    const Icon = serviceIcons[index];
                    const color = serviceColors[index];
                    return (
                        <div
                            key={index}
                            className="service-card card pointer-events-auto absolute top-1/3 left-0 right-0 mx-auto w-3/4 md:w-2/3 lg:w-3/5 flex flex-col gap-4 p-6! shadow-2xl"
                            style={{ zIndex: index }}
                        >
                            <div className="flex flex-col gap-2">
                                <h2 className="services-list-item text-3xl m-0">
                                    {service.name}
                                </h2>
                                <p className="text-sm text-[#4d4d4d]">{service.description}</p>
                            </div>
                            <Icon
                                aria-hidden
                                className="w-35 h-35 md:w-50 md:h-50 shrink-0 mx-auto"
                                style={{ fill: color }}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesSection;
