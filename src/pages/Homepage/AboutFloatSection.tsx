import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – GSAP ships Draggable.js (uppercase) but types reference draggable.d.ts (lowercase)
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
import { TRANSLATIONS } from "../../constants/translations";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const AboutFloatSection = ({ content }: Props) => {
    const aboutImageWrapRef = useRef<HTMLDivElement | null>(null);
    const floatEls = useRef<HTMLDivElement[]>([]);
    const addFloatRef = (el: HTMLDivElement | null) => {
        if (el && !floatEls.current.includes(el)) floatEls.current.push(el);
    };

    useGSAP(() => {
        const cleanups: (() => void)[] = [];

        floatEls.current.forEach((el) => {
            gsap.set(el, { rotate: 6, force3D: true });

            let tween: gsap.core.Tween;
            const startFloat = () => {
                tween = gsap.to(el, {
                    x: `+=${gsap.utils.random(-55, 55)}`,
                    y: `+=${gsap.utils.random(-65, 65)}`,
                    rotate: gsap.utils.random(-10, 10),
                    duration: gsap.utils.random(3, 6),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            };
            startFloat();

            const [draggable] = Draggable.create(el, {
                type: "x,y",
                onPress() {
                    tween?.pause();
                },
                onRelease() {
                    tween?.kill();
                    startFloat();
                },
            });

            const onEnter = () => tween?.pause();
            const onLeave = () => {
                if (!draggable.isDragging) tween?.resume();
            };
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);

            cleanups.push(() => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
                tween?.kill();
                draggable.kill();
            });
        });

        return () => cleanups.forEach((fn) => fn());
    });

    return (
        <section className="lg:h-screen w-full z-30 px-5 mb-5 mt-30 lg:mt-5 flex flex-col gap-10 lg:gap-5 items-center lg:flex-row max-w-[min(1700px,90vw)] mx-auto">
            <div className="h-full justify-center flex flex-col gap-4 lg:w-1/2 text-left">
                <div className="w-2/5 md:w-1/5 lg:w-4/5 flex justify-end mb-7 lg:mb-0">
                    <div ref={addFloatRef} className="relative w-fit">
                        <img
                            src="1733157254607.jpg"
                            alt="Fotografia da Diana Fonte, fundadora da Divode"
                            className="peer rounded-full w-25 z-2! relative shadow-2xl hover:cursor-pointer"
                        />
                        <div className="flex items-center absolute top-1/2 left-full -translate-y-1/2 h-25 z-1! w-max max-w-xs bg-white rounded-full shadow-md ps-25 pe-3 lg:opacity-0 -translate-x-22! peer-hover:opacity-100 hover:opacity-100 peer-hover:translate-x-0 transition-all duration-200 ease-out">
                            <p
                                className="mb-0 text-[#4d4d4d] text-sm"
                                dangerouslySetInnerHTML={{
                                    __html: content.about.longText.p1,
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
                <h2
                    className="font-bold text-3xl md:text-4xl lg:text-6xl"
                    dangerouslySetInnerHTML={{
                        __html: content.about.longText.p2,
                    }}
                ></h2>
                <p
                    className="mt-4 text-sm"
                    dangerouslySetInnerHTML={{
                        __html: content.about.longText.p3,
                    }}
                ></p>
                <p
                    className="mb-5 text-sm"
                    dangerouslySetInnerHTML={{
                        __html: content.about.longText.p4,
                    }}
                ></p>
            </div>
            <div className="about-image-col items-start shrink-0 w-full lg:h-full lg:w-1/3 lg:ml-auto">
                <div
                    ref={aboutImageWrapRef}
                    className="about-image-pin lg:h-full"
                >
                    <div className="mx-auto md:mx-0  lg:ml-1/6 mb-5 grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-10 w-full lg:h-full">
                        {Object.values(content.about.horizontalText).map(
                            (text, index) => (
                                <div
                                    key={index}
                                    ref={addFloatRef}
                                    className="relative w-fit"
                                >
                                    <div className="peer rounded-[50px] z-2! relative w-25 h-25 bg-[#bc1816] flex items-center justify-center shadow-2xl hover:cursor-pointer">
                                        <div className="font-advent text-3xl h-fit text-white">
                                            0{index + 1}
                                        </div>
                                    </div>
                                    <div className="flex items-center absolute top-1/2 left-full -translate-y-12.5 min-h-25 z-1! w-max max-w-xs bg-white rounded-r-xl rounded-l-[50px] shadow-md ps-30 pe-5 py-5 lg:hidden lg:opacity-0 -translate-x-25! lg:peer-hover:flex peer-hover:opacity-100 peer-hover:translate-x-0 transition-all duration-200 ease-out">
                                        <p className="my-auto text-black text-sm">
                                            {text}
                                        </p>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFloatSection;
