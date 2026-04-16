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
            className="w-full h-screen flex flex-col justify-between items-center p-3 pt-4 lg:p-5! lg:py-15! mx-auto z-20"
        >
            <p
                className="text-xl font-semibold rounded px-3 py-2 mt-7 mb-0 text-center z-20"
                dangerouslySetInnerHTML={{
                    __html: content.services.bottomText,
                }}
            />

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

            <p
                className="text-center text-base rounded px-3 z-2"
                dangerouslySetInnerHTML={{
                    __html: content.services.topText,
                }}
            ></p>
        </section>
    );
};

export default ServicesSection;
