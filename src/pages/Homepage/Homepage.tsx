import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../context/LanguageContext";
import { TRANSLATIONS } from "../../constants/translations";
import { BG_SVGS } from "../../constants/enums";
import { setupFloaters, setupParallaxLayers } from "./animations";
import LandingSection from "./LandingSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import ContactsSection from "./ContactsSection";

type Floater = {
    id: string;
    src: string;
    sectionId: string;
    xPct: number;
    yPct: number;
    size: number;
    depth: number;
    opacity: number;
};

const SECTION_IDS = ["bg"] as const;

const mulberry32 = (seed: number) =>
    function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

const Homepage = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];

    const floatersBySection = useMemo(() => {
        const rand = mulberry32(1337);
        const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

        const makePoints = (
            count: number,
            random: () => number,
            { pad = 0, minDist = 12, tries = 50 } = {},
        ) => {
            const pts: { x: number; y: number }[] = [];

            for (let i = 0; i < count; i++) {
                let x = 50;
                let y = 50;
                let ok = false;

                for (let t = 0; t < tries; t++) {
                    x = pad + random() * (100 - pad * 2);
                    y = pad + random() * (100 - pad * 2);

                    ok = pts.every((p) => {
                        const dx = x - p.x;
                        const dy = y - p.y;
                        return Math.hypot(dx, dy) >= minDist;
                    });

                    if (ok) break;
                }

                pts.push({ x, y });
            }

            return pts;
        };

        const counts: Record<(typeof SECTION_IDS)[number], number> = {
            bg: 100,
        };

        const result: Record<(typeof SECTION_IDS)[number], Floater[]> = {
            bg: [],
        };

        SECTION_IDS.forEach((sectionId) => {
            const count = counts[sectionId];
            const points = makePoints(count, rand, { minDist: 10, pad: 0 });

            for (let i = 0; i < count; i++) {
                const { x, y } = points[i];

                result[sectionId].push({
                    id: `${sectionId}-${i}`,
                    src: pick(BG_SVGS),
                    sectionId,
                    xPct: x,
                    yPct: y,
                    size: 40 + rand() * 140,
                    depth: 5 + rand() * 0.9,
                    opacity: 0.25 + rand() * 0.5,
                });
            }
        });

        return result;
    }, []);

    const rootRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const selector = gsap.utils.selector(rootRef.current!);
            setupFloaters(selector);
            setupParallaxLayers(selector);
        },
        { scope: rootRef },
    );

    return (
        <div
            id="bg"
            ref={rootRef}
            className="relative flex items-center justify-center flex-col"
        >
            {/* Background floaters layer */}
            <div
                className="bg-layer"
                data-section="bg"
                data-depth="0.5"
                aria-hidden
            >
                {floatersBySection.bg.map((f) => (
                    <img
                        key={f.id}
                        className="floater"
                        src={f.src}
                        alt=""
                        draggable={false}
                        data-depth={f.depth}
                        style={{
                            left: `${f.xPct}%`,
                            top: `${f.yPct}%`,
                            width: `${f.size}px`,
                            opacity: f.opacity,
                        }}
                    />
                ))}
            </div>

            <LandingSection content={content} />
            <ServicesSection content={content} language={language} />
            <AboutSection content={content} />
            <ContactsSection content={content} language={language} />
        </div>
    );
};

export default Homepage;
