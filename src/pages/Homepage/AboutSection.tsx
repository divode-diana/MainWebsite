import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { setupAboutImagePin } from "./animations";
import { TRANSLATIONS } from "../../constants/translations";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const getBgColor = (index: number) => {
    if (index === 0) return "#B6E8F6";
    if (index === 1) return "#fff";
    if (index === 2) return "#89BFC1";
    return "#F1F0EA";
};

const getRotateDeg = (index: number) => {
    if (index === 0) return "-5";
    if (index === 1) return "4";
    if (index === 2) return "0.5";
    return "-4";
};

const AboutSection = ({ content }: Props) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const aboutImageWrapRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;
            setupAboutImagePin(sectionRef.current, aboutImageWrapRef.current);
        },
        { scope: sectionRef },
    );

    return (
        <section
            id="about"
            ref={sectionRef}
            className="w-full bg-blue z-30 px-5 mt-5 flex flex-col gap-10 md:gap-20 justify-center items-center"
        >
            <p
                className="about-toptext text-white text-lg md:text-xl text-center font-bold mx-auto mt-16 mb-5 md:pt-5"
                dangerouslySetInnerHTML={{
                    __html: content.about.topText,
                }}
            />

            <div className="flex gap-3 md:gap-5 my-5 mx-auto justify-center items-start text-center text-white">
                <div className="flex flex-col gap-2 md:max-w-1/2 text-left">
                    <img
                        src="1733157254607.jpg"
                        alt="Fotografia da Diana Fonte, fundadora da Divode"
                        className="rounded-full w-1/2 mx-auto"
                    />
                    <p
                        className="font-bold text-2xl font-advent mb-0 mx-auto md:mx-0"
                        dangerouslySetInnerHTML={{
                            __html: content.about.longText.p1,
                        }}
                    ></p>
                    <p
                        className="font-bold text-sm mb-5 mx-auto md:mx-0"
                        dangerouslySetInnerHTML={{
                            __html: content.about.longText.p2,
                        }}
                    ></p>
                    <p
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: content.about.longText.p3,
                        }}
                    ></p>
                    <p
                        className="mb-5"
                        dangerouslySetInnerHTML={{
                            __html: content.about.longText.p4,
                        }}
                    ></p>
                </div>
                <div className="about-image-col hidden md:flex items-start flex-shrink-0">
                    <div ref={aboutImageWrapRef} className="about-image-pin">
                        <div className="mx-auto md:mx-0 mb-5 flex flex-col items-center gap-10 mt-10">
                            {Object.values(content.about.horizontalText).map(
                                (text, index) => (
                                    <div
                                        key={index}
                                        className="about-card shrink-0 p-3 flex items-center justify-center text-center rounded-xl shadow-lg"
                                        style={{
                                            width: "80%",
                                            maxWidth: "90vw",
                                            backgroundColor: getBgColor(index),
                                            transform: `rotate(${getRotateDeg(index)}deg)`,
                                        }}
                                    >
                                        <p className="text-[0.85rem] font-bold m-0 text-black">
                                            {text}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full container max-w-[min(1700px,90vw)] mx-auto mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {content.about.bubbles.map((bubble, index) => (
                        <div
                            key={index}
                            className="about-bubble bg-white p-4 rounded-full flex items-center justify-center"
                            style={{ width: "12rem", height: "12rem" }}
                        >
                            <p
                                className="font-semibold text-center text-[0.85rem] m-0"
                                dangerouslySetInnerHTML={{
                                    __html: bubble,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
