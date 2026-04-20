import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ServicesIcon, setupServices } from "./animations";
import { TRANSLATIONS } from "../../constants/translations";
import { LANGUAGES } from "../../constants/enums";

type Props = {
    content: (typeof TRANSLATIONS)[number];
    language: LANGUAGES;
};

const ServicesSection = ({ content, language }: Props) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const servicesIconWrapRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;
            setupServices(sectionRef.current, servicesIconWrapRef.current);
        },
        {
            scope: sectionRef,
            dependencies: [language],
            revertOnUpdate: true,
        },
    );

    return (
        <section
            id="services"
            ref={sectionRef}
            className="w-full h-screen flex flex-col lg:flex-row justify-between items-center py-15 md:py-0 max-w-[min(1700px,90vw)] mx-auto z-20"
        >
            <div className="flex flex-col gap-4 md:gap-10 md:w-2/5" data-aos="fade-up">
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

            <div
                ref={servicesIconWrapRef}
                className="flex flex-col gap-3 justify-center items-center w-full"
            >
                <ServicesIcon aria-hidden className="w-50 h-50" />

                <div
                    className="relative w-full flex justify-center"
                    style={{ minHeight: "70px" }}
                >
                    {content.services.list.map((service, index) => (
                        <h2
                            key={index}
                            className="services-list-item text-3xl font-bold text-center m-0 z-10 absolute"
                        >
                            {service}
                        </h2>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
