import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TRANSLATIONS } from "../../constants/translations";
import { setupAboutCarousel } from "./animations";

type Props = {
    content: (typeof TRANSLATIONS)[number];
};

const AboutBubblesSection = ({ content }: Props) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const squiggleRef = useRef<SVGPathElement | null>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !trackRef.current) return;
            setupAboutCarousel(
                sectionRef.current,
                trackRef.current,
                content.about.bubbles.length,
                squiggleRef.current,
            );
        },
        { scope: sectionRef },
    );

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden z-30 bg-[#0678c5]"
        >
            {/* Squiggle background */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 4000 2200"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
            >
                <path
                    ref={squiggleRef}
                    d="M -150 1120 C 80 760 260 1510 480 940 C 610 580 250 420 160 760 C 40 1210 690 1370 760 850 C 825 370 1150 470 1060 920 C 980 1320 590 1240 610 900 C 635 520 1240 360 1410 820 C 1590 1310 880 1600 790 1070 C 710 590 1450 210 1650 780 C 1845 1330 1080 1750 950 1120 C 875 760 1350 650 1450 980 C 1555 1325 1150 1510 1060 1190 C 960 835 1510 780 1585 1110 C 1650 1395 1320 1510 1250 1230 C 1180 930 1730 650 1880 1040 C 2045 1475 1500 1700 1390 1260 C 1270 780 2080 450 2260 1020 C 2420 1530 1620 1810 1540 1170 C 1500 790 1980 720 2110 1040 C 2250 1395 1850 1570 1740 1260 C 1625 940 2190 800 2310 1130 C 2420 1435 2050 1640 1930 1320 C 1790 950 2460 520 2670 1030 C 2890 1560 2100 1900 1980 1220 C 1885 680 2790 260 3030 1010 C 3255 1710 2230 1970 2190 1120 C 2160 590 2870 600 2860 1130 C 2850 1680 2300 1550 2350 1080 C 2410 520 3230 540 3260 1130 C 3295 1810 2520 1770 2590 1130 C 2645 620 3380 360 3570 960 C 3755 1545 3040 1930 2890 1220"
                    stroke="#89bfc1"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <div
                ref={trackRef}
                className="flex h-full"
                style={{ width: `${content.about.bubbles.length * 100}%` }}
            >
                {content.about.bubbles.map((bubble, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center px-8 md:px-24"
                        style={{ width: `${100 / content.about.bubbles.length}%` }}
                    >
                        <h3
                            className="text-[1.5rem] font-bold text-[#1c4263] leading-snug text-center max-w-2/3 card shadow-2xl"
                            dangerouslySetInnerHTML={{ __html: bubble }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutBubblesSection;
