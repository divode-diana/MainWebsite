import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ReactComponent as MouseIcon } from "../../assets/mouse.svg";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ─── Background Layer ─────────────────────────────────────────────────────────

export const setupFloaters = (
    selector: ReturnType<typeof gsap.utils.selector>,
) => {
    const floaters = selector<HTMLElement>(".floater");

    gsap.set(floaters, {
        xPercent: -50,
        yPercent: -50,
        force3D: true,
    });

    floaters.forEach((el) => {
        gsap.to(el, {
            x: `+=${gsap.utils.random(-55, 55)}`,
            y: `+=${gsap.utils.random(-65, 65)}`,
            rotate: gsap.utils.random(-15, 15),
            duration: gsap.utils.random(3, 6),
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

export const setupButtonFloat = (el: HTMLElement | null) => {
    if (!el) return;

    const animate = () => {
        gsap.to(el, {
            x: gsap.utils.random(-18, 18),
            y: gsap.utils.random(-14, 14),
            rotate: gsap.utils.random(-6, 6),
            duration: gsap.utils.random(2.5, 4.5),
            ease: "sine.inOut",
            onComplete: animate,
        });
    };

    animate();
};

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

// ─── About Section ────────────────────────────────────────────────────────────

export const setupAboutCarousel = (
    sectionEl: HTMLElement,
    track: HTMLElement,
    slideCount: number,
    squigglePath?: SVGPathElement | null,
) => {
    if (slideCount < 2) return;

    const totalScrollPx = window.innerHeight * (slideCount - 1);

    ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${totalScrollPx}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
    });

    const scrollConfig = {
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${totalScrollPx}`,
        scrub: 0.5,
        invalidateOnRefresh: true,
    };

    gsap.to(track, {
        x: () => -(sectionEl.offsetWidth * (slideCount - 1)),
        ease: "none",
        scrollTrigger: scrollConfig,
    });

    if (squigglePath) {
        gsap.set(squigglePath, { drawSVG: "0%" });
        gsap.to(squigglePath, {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: scrollConfig,
        });
    }
};

// ─── Shared ───────────────────────────────────────────────────────────────────

export const setupCardGradientBorder = (wrapEl: HTMLElement) => {
    let angle = 0;

    // getVelocity() returns px/s. Multiplying by a small factor converts
    // speed into rotation degrees per update tick (~60fps).
    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
            angle += self.getVelocity() * 0.002;
            wrapEl.style.setProperty("--border-angle", `${angle}deg`);
        },
    });
};

export { MouseIcon };
