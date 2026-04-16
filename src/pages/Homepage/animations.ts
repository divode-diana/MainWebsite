import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ReactComponent as MouseIcon } from "../../assets/mouse.svg";
import { ReactComponent as ServicesIcon } from "../../assets/services_icons.svg";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

// ─── Background Layer ─────────────────────────────────────────────────────────

export const setupFloaters = (selector: ReturnType<typeof gsap.utils.selector>) => {
    const floaters = selector<HTMLElement>(".floater");

    gsap.set(floaters, {
        xPercent: -50,
        yPercent: -50,
        force3D: true,
    });

    floaters.forEach((el) => {
        gsap.to(el, {
            x: `+=${gsap.utils.random(-20, 20)}`,
            y: `+=${gsap.utils.random(-25, 25)}`,
            rotate: gsap.utils.random(-6, 6),
            duration: gsap.utils.random(4, 7),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });
};

export const setupParallaxLayers = (
    selector: ReturnType<typeof gsap.utils.selector>,
) => {
    const layers = selector<HTMLElement>(".bg-layer");

    layers.forEach((layer) => {
        const sectionId = layer.dataset.section;
        const depth = parseFloat(layer.dataset.depth || "0.3");

        const trigger =
            sectionId === "bg"
                ? selector<HTMLElement>("#landing")[0]
                : (document.getElementById(sectionId || "") ??
                  layer.parentElement);

        if (!trigger) return;

        gsap.fromTo(
            layer,
            { y: 0 },
            {
                y: -window.innerHeight * depth,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            },
        );
    });
};

// ─── Landing Section ──────────────────────────────────────────────────────────

export const setupMouse = (mouseWrap: HTMLDivElement | null) => {
    const line = mouseWrap?.querySelector<SVGPathElement>(".mouse-line");
    if (!line) return;

    gsap.set(line, { drawSVG: "0% 60%" });
    gsap.fromTo(
        line,
        { drawSVG: "0% 60%" },
        {
            drawSVG: "55% 100%",
            duration: 1,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.15,
        },
    );
};

// ─── Services Section ─────────────────────────────────────────────────────────

export const setupServices = (
    sectionEl: HTMLElement,
    servicesIconWrap: HTMLDivElement | null,
) => {
    const items = Array.from(
        sectionEl.querySelectorAll<HTMLElement>(".services-list-item"),
    );

    if (!items.length) return;

    const svg = servicesIconWrap?.querySelector("svg");
    const active = svg?.querySelector<SVGPathElement>("#iconActive") ?? null;

    gsap.set(items, {
        transformPerspective: 700,
        backfaceVisibility: "hidden",
        rotationX: -90,
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: () => `+=${items.length * (window.innerHeight * 0.75)}`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    });

    const animationTime = 1;
    const depth = -window.innerWidth / 35;
    const transformOrigin = `50% 50% ${depth}`;
    const lastItem = items.length - 1;

    const targets = ["#pen", "#object", "#palette", "#code", "#wifi", "#screwdriver"];
    const colors = ["#CF0501", "#138184", "#2EBCE4", "#0678C5", "#1C4263", "#88735A"];

    // Hide morph target paths — they are data sources for MorphSVG, not visual elements
    targets.forEach((id) => {
        const el = svg?.querySelector(id);
        if (el) gsap.set(el, { display: "none" });
    });

    items.forEach((item, i) => {
        timeline.to(
            item,
            {
                rotationX: i === lastItem ? 0 : 90,
                duration: i === lastItem ? animationTime / 2 : animationTime,
                ease: "none",
                transformOrigin,
            },
            i * 0.8,
        );

        if (active && targets[i]) {
            timeline.to(
                active,
                {
                    morphSVG: targets[i],
                    fill: colors[i],
                    duration: animationTime / 2,
                    ease: "none",
                },
                i * 0.8,
            );
        }
    });
};

// ─── About Section ────────────────────────────────────────────────────────────
// Image pinning is handled via CSS position: sticky on .about-image-pin

export const setupAboutImagePin = (
    sectionEl: HTMLElement,
    aboutImageWrap: HTMLDivElement | null,
) => {
    if (!aboutImageWrap) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
        gsap.set(aboutImageWrap, { force3D: true, willChange: "transform" });

        const stopOffset = 200; // px — increase to stop earlier

        gsap.to(aboutImageWrap, {
            y: () => {
                const scrollStart =
                    aboutImageWrap.getBoundingClientRect().top +
                    window.scrollY +
                    aboutImageWrap.offsetHeight / 2 -
                    window.innerHeight / 2;
                const scrollEnd =
                    sectionEl.getBoundingClientRect().top +
                    window.scrollY +
                    sectionEl.offsetHeight -
                    stopOffset -
                    window.innerHeight;
                return Math.max(0, scrollEnd - scrollStart);
            },
            ease: "none",
            scrollTrigger: {
                trigger: aboutImageWrap,
                endTrigger: sectionEl,
                start: "center center",
                end: `bottom-=${stopOffset} bottom`,
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
        });
    });
};

// ─── Shared ───────────────────────────────────────────────────────────────────

export const setupUnderlines = (
    selector: ReturnType<typeof gsap.utils.selector>,
) => {
    selector<HTMLElement>(".animated-underline").forEach((el) => {
        const trigger = el.closest("p, h1, h2, h3, h4, h5, h6, li, div") || el;

        gsap.set(el, {
            backgroundSize: "0% 2px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
        });

        gsap.to(el, {
            backgroundSize: "100% 3px",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger,
                start: "top 80%",
                once: true,
                invalidateOnRefresh: true,
            },
        });
    });
};

export { MouseIcon, ServicesIcon };
