import React, { useMemo, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import Icon from "../shared/Icon";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import { BG_SVGS, LANGUAGES } from "../constants/enums";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ReactComponent as MouseIcon } from "../assets/mouse.svg";
import { ReactComponent as ServicesIcon } from "../assets/services_icons.svg";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);

type Floater = {
    id: string;
    src: string;
    sectionId: string;
    xPct: number; // 0..100
    yPct: number; // 0..100
    size: number; // px
    depth: number; // 0.1..0.6 (parallax strength)
    opacity: number;
};

const Homepage = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    const SECTION_IDS = ["bg", "contacts"] as const;
    const mulberry32 = (seed: number) =>
        function () {
            seed |= 0;
            seed = (seed + 0x6d2b79f5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    const floatersBySection = useMemo(() => {
        const rand = mulberry32(1337);
        const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

        const makePoints = (
            count: number,
            rand: () => number,
            {
                pad = 0, // keep away from edges
                minDist = 12, // in percentage points (tune per section)
                tries = 50, // attempts per item
            } = {}
        ) => {
            const pts: { x: number; y: number }[] = [];

            for (let i = 0; i < count; i++) {
                let x = 50;
                let y = 50;
                let ok = false;

                for (let t = 0; t < tries; t++) {
                    x = pad + rand() * (100 - pad * 2);
                    y = pad + rand() * (100 - pad * 2);

                    ok = pts.every((p) => {
                        const dx = x - p.x;
                        const dy = y - p.y;
                        return Math.hypot(dx, dy) >= minDist;
                    });

                    if (ok) break;
                }

                pts.push({ x, y }); // even if not ok, push last attempt to avoid infinite loops
            }

            return pts;
        };

        const counts: Record<(typeof SECTION_IDS)[number], number> = {
            bg: 70,
            contacts: 10,
        };

        const res: Record<(typeof SECTION_IDS)[number], Floater[]> = {
            bg: [],
            contacts: [],
        };

        SECTION_IDS.forEach((sectionId) => {
            const count = counts[sectionId];
            const points =
                sectionId === "bg"
                    ? makePoints(count, rand, { minDist: 10, pad: 0 })
                    : makePoints(count, rand, { minDist: 10, pad: 0 }); // contacts has fewer, so keep more spacing

            for (let i = 0; i < count; i++) {
                const { x, y } = points[i];
                res[sectionId].push({
                    id: `${sectionId}-${i}`,
                    src: pick(BG_SVGS),
                    sectionId,
                    xPct: x,
                    yPct: y,
                    size: 40 + rand() * 140,
                    depth: 5 + rand() * 0.9,
                    opacity: 0.25 + rand() * 0.55,
                });
            }
        });

        return res;
    }, []);

    const bgRef = useRef<HTMLDivElement | null>(null);
    const contactsRef = useRef<HTMLDivElement | null>(null);
    const servicesIconWrapRef = useRef<HTMLDivElement | null>(null);
    const mouseWrapRef = useRef<HTMLDivElement | null>(null);
    const aboutSectionRef = useRef<HTMLElement | null>(null);
    const aboutStickyRef = useRef<HTMLDivElement | null>(null);
    const aboutCardsSectionRef = useRef<HTMLDivElement | null>(null);
    const aboutCardsPinRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        // BACKGROUND PARALLAX
        const layers = gsap.utils.toArray<HTMLElement>(".bg-layer");

        layers.forEach((layer) => {
            const sectionId = layer.dataset.section;
            const depth = parseFloat(layer.dataset.depth || "0.25");

            const trigger = sectionId
                ? document.getElementById(sectionId)
                : layer.parentElement;

            if (!trigger) return;

            gsap.to(layer, {
                y: () => -window.innerHeight * depth,
                ease: "none",
                scrollTrigger: {
                    trigger,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        });

        const floaters = gsap.utils.toArray<HTMLElement>(".floater");
        const tweens = new Map<HTMLElement, gsap.core.Tween>();

        gsap.set(floaters, { xPercent: -50, yPercent: -50 });

        floaters.forEach((el, i) => {
            const t = gsap.to(el, {
                x: `+=${gsap.utils.random(-20, 20)}`,
                y: `+=${gsap.utils.random(-25, 25)}`,
                rotate: gsap.utils.random(-6, 6),
                duration: gsap.utils.random(4, 7),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
            tweens.set(el, t);
        });

        //TITLE
        gsap.from(".title", {
            y: -200,
            opacity: 0,
            rotation: "random(-80, 80)",
            duration: 1.1,
            ease: "back",
            stagger: 0.2,
        });

        //UNDERLINES
        const els = gsap.utils.toArray<HTMLElement>(".animated-underline");
        els.forEach((el) => {
            gsap.fromTo(
                el,
                { backgroundSize: "0% 2px" },
                {
                    backgroundSize: "100% 3px",
                    duration: 1.5,
                    delay: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        });

        // MOUSE SVG SCROLL
        const line =
            mouseWrapRef.current?.querySelector<SVGPathElement>(".mouse-line");
        if (line) {
            gsap.set(line, { drawSVG: "0% 60%" });
            gsap.fromTo(
                line,
                { drawSVG: "0% 60%" }, // ← 45% of the path visible
                {
                    drawSVG: "55% 100%",
                    duration: 1,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                    repeatDelay: 0.15,
                }
            );
        }

        //SERVICES
        const servicesSection = document.getElementById("services");
        const items = gsap.utils.toArray<HTMLElement>(".services-list-item");
        const svg = servicesIconWrapRef.current?.querySelector("svg");
        if (!svg) return;
        const active = svg.querySelector<SVGPathElement>("#iconActive"); // you must create this

        if (servicesSection && items.length) {
            // Initial states
            gsap.set(items, {
                perspective: 700,
                transformStyle: "preserve-3d",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: servicesSection,
                    start: "top top",
                    end: () =>
                        `+=${items.length * (window.innerHeight * 0.75)}`,
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });

            const animTime = 1;
            const width = window.innerWidth;
            const depth = -width / 35;
            const transformOrigin = `50% 50% ${depth}`;
            const lastItem = items.length - 1;

            items.forEach((item, i) => {
                if (i !== lastItem) {
                    tl.fromTo(
                        item,
                        { rotationX: -90 },
                        {
                            rotationX: 90,
                            stagger: 0.08,
                            duration: animTime,
                            ease: "none",
                            transformOrigin,
                        },
                        i * 0.8 // stagger between lines
                    );
                } else {
                    tl.fromTo(
                        item,
                        { rotationX: -90 },
                        {
                            rotationX: 0,
                            stagger: 0.08,
                            duration: animTime / 2,
                            ease: "none",
                            transformOrigin,
                        },
                        i * 0.8 // stagger between lines
                    );
                }
            });

            const targets = [
                "#pen",
                "#object",
                "#palette",
                "#code",
                "#wifi",
                "#screwdriver",
            ];

            const targetColors = [
                "#CF0501",
                "#138184",
                "#2EBCE4",
                "#0678C5",
                "#1C4263",
                "#88735A",
            ];

            targets.forEach((sel, i) => {
                tl.to(
                    active,
                    {
                        morphSVG: sel,
                        fill: targetColors[i],
                        duration: animTime / 2,
                        ease: "none",
                    },
                    i * 0.8
                );
            });
        }

        //BLUE PANEL SNAP

        //ABOUT BUBBLES
        // const bubbles = gsap.utils.toArray<HTMLElement>(".about-bubble");
        // const topText =
        //     aboutStickyRef.current?.querySelector<HTMLElement>(
        //         ".about-toptext"
        //     );
        // const image =
        //     aboutStickyRef.current?.querySelector<HTMLElement>(".about-image");

        // gsap.set(bubbles, { opacity: 0, y: 18, scale: 0.94, rotate: -0.5 });
        // if (topText) gsap.set(topText, { opacity: 0.9, y: 0 });
        // if (image) gsap.set(image, { opacity: 0, scale: 0.98, y: 10 });
        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: aboutSectionRef.current, // <-- key: trigger the whole section
        //         start: "top top", // start as soon as About hits top
        //         end: "+=120%", // controls how “fast” the sequence progresses
        //         scrub: true,
        //         // markers: true,
        //     },
        // });
        // if (topText) {
        //     tl.to(
        //         topText,
        //         { opacity: 1, y: -6, ease: "none", duration: 0.15 },
        //         0
        //     );
        // }
        // tl.to(
        //     bubbles,
        //     {
        //         opacity: 1,
        //         y: 0,
        //         scale: 1,
        //         ease: "none",
        //         rotate: 0,
        //         stagger: {
        //             each: 1, // spacing between bubble reveals *in timeline time*
        //             from: "start",
        //         },
        //         duration: 1,
        //     },
        //     0.1
        // );
        // if (image) {
        //     tl.to(
        //         image,
        //         { opacity: 1, y: 0, scale: 1, ease: "none", duration: 0.25 },
        //         ">-0.15"
        //     );
        // }

        // //ABOUT CARDS HORIZONTAL SCROLL
        // const scene = aboutCardsSectionRef.current;
        // const cards = gsap.utils.toArray<HTMLElement>(".about-card");

        // if (scene && cards.length) {
        //     // 0..split runs during normal scroll, split..1 runs during pinned scroll
        //     const split = 0.35; // tune 0.25–0.5
        //     const fromX = () => window.innerWidth * 0.6;

        //     const startRot = [-8, 6, -5, 7, -6, 5];
        //     const endRot = [2, -3, 4, -2, 3, -4];

        //     // initial state
        //     gsap.set(cards, {
        //         x: fromX(),
        //         opacity: 0,
        //         scale: 0.96,
        //         rotate: (i: number) => startRot[i % startRot.length],
        //         willChange: "transform, opacity",
        //     });

        //     // master timeline (paused). We'll drive progress manually with ScrollTriggers.
        //     const cardsTL = gsap.timeline({ paused: true });

        //     cardsTL.to(cards, {
        //         x: 0,
        //         opacity: 1,
        //         scale: 1,
        //         rotate: (i: number) => endRot[i % endRot.length],
        //         ease: "none",
        //         stagger: { each: 1, from: "start" },
        //         duration: 1,
        //     });

        //     // Phase A: when section enters viewport, start progress up to `split`
        //     ScrollTrigger.create({
        //         trigger: scene,
        //         start: "bottom 80%",
        //         end: "bottom bottom", // IMPORTANT: ends exactly when we hit the end of the section
        //         scrub: true,
        //         invalidateOnRefresh: true,
        //         onRefresh: () => {
        //             // keep initial offset responsive after refresh/resize
        //             gsap.set(cards, { x: fromX() });
        //         },
        //         onUpdate: (self) => {
        //             cardsTL.progress(
        //                 gsap.utils.mapRange(0, 1, 0, split, self.progress)
        //             );
        //         },
        //         // markers: true,
        //     });

        //     // Phase B: once we reach the end of the section, pin and finish progress `split`..`1`
        //     ScrollTrigger.create({
        //         trigger: scene,
        //         start: "bottom bottom",
        //         end: "+=140%", // how long the pin lasts (tune)
        //         scrub: true,
        //         pin: scene, // <-- this is the “screen sticks”
        //         pinSpacing: true, // <-- adds scroll space for the remaining animation
        //         anticipatePin: 1,
        //         onUpdate: (self) => {
        //             cardsTL.progress(
        //                 gsap.utils.mapRange(0, 1, split, 1, self.progress)
        //             );
        //         },
        //         // markers: true,
        //     });
        // }
    });

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            message: "",
        },
        validate: (values) => {
            const errors: {
                name?: string;
                phone?: string;
                email?: string;
                message?: string;
            } = {};
            if (!values.name) {
                errors.name = content.contacts.form.mandatoryError;
            }
            if (!/^\+?[0-9]{7,15}$/.test(values.phone)) {
                errors.phone = content.contacts.form.formatError;
            }
            if (!values.email) {
                errors.email = content.contacts.form.mandatoryError;
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.message) {
                errors.message = content.contacts.form.mandatoryError;
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            if (!captchaValue) {
                toast.error(content.contacts.form.fieldsError, {
                    position: "top-right",
                });
                return;
            }

            setSendingEmail(true);
            emailjs
                .send(
                    process.env.REACT_APP_EMAILJS_SERVICE_ID!,
                    language === LANGUAGES.pt
                        ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID_PT!
                        : process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ENG!,
                    {
                        name: values.name,
                        phone: values.phone,
                        email: values.email,
                        message: values.message,
                    },
                    process.env.REACT_APP_EMAILJS_USER_ID
                )
                .then(
                    () => {
                        setSendingEmail(false);
                        toast.success(content.contacts.form.success.title, {
                            position: "top-right",
                        });
                        resetForm();
                        setCaptchaValue(null);
                    },
                    (error) => {
                        setSendingEmail(false);
                        toast.error(content.contacts.form.error.title, {
                            position: "top-right",
                        });
                        console.log(error);
                    }
                );
        },
    });

    return (
        <>
            <div
                id="bg"
                ref={bgRef}
                className="d-flex align-items-center justify-content-center flex-column mb-4"
            >
                <div
                    className="bg-layer"
                    data-section="bg"
                    data-depth="1.5"
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

                {/* ________________ LANDING ________________ */}
                <section
                    id="landing"
                    className="position-relative z-1 d-flex flex-column gap-4 align-items-center justify-content-between minh-100 w-content p-3 pt-4 p-lg-5 py-lg-4"
                >
                    <div></div>
                    <div className="d-flex flex-column gap-4 align-items-center mt-4">
                        <h2 className="title text-center w-md-75">
                            {content.landing.title}
                        </h2>
                        <p
                            className="m-0 text-center w-md-50"
                            dangerouslySetInnerHTML={{
                                __html: content.landing.subtitle,
                            }}
                        ></p>
                        <HashLink
                            smooth
                            to={"./#contacts"}
                            className={"box btn btn-primary"}
                        >
                            {content.landing.cta}
                        </HashLink>
                    </div>
                    <div className="d-flex flex-column align-items-center gap-2">
                        <p className="mb-0 fs-8">{content.landing.scroll}</p>
                        <div ref={mouseWrapRef}>
                            <MouseIcon aria-hidden />
                        </div>
                    </div>
                </section>

                {/* ________________ SERVICES ________________ */}
                <section
                    id="services"
                    className="w-100 vh-100 d-flex flex-column justify-content-between align-items-center p-3 pt-4 p-lg-5 mx-auto z-2"
                >
                    {/* Top Text */}
                    <p
                        className="fs-3 fw-semibold rounded px-3 py-2 mt-5 text-center bg-glass-light z-2"
                        dangerouslySetInnerHTML={{
                            __html: content.services.bottomText,
                        }}
                    />

                    <div
                        ref={servicesIconWrapRef}
                        className="d-flex flex-column gap-3 justify-content-center align-items-center w-100"
                    >
                        <ServicesIcon aria-hidden />

                        <div
                            className="position-relative w-100  d-flex justify-content-center"
                            style={{ minHeight: "70px" }}
                        >
                            {/* Middle Text (Services) */}
                            {content.services.list.map((service, index) => (
                                <h2
                                    key={index}
                                    className="services-list-item display-1 fw-bold text-center m-0 z-1 position-absolute"
                                >
                                    {service}
                                </h2>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <p
                        className="text-center fs-7 rounded px-3 bg-glass-light z-2"
                        dangerouslySetInnerHTML={{
                            __html: content.services.topText,
                        }}
                    ></p>
                </section>
            </div>

            {/* ________________ ABOUT (Bubbles) ________________ */}

            <section
                id="about"
                ref={aboutSectionRef}
                className="position-relative w-100 bg-blue z-3 px-5"
            >
                <div
                    id="about_bubbles"
                    ref={aboutStickyRef}
                    className="vh-100 d-flex flex-column justify-content-center align-items-center"
                    style={{
                        height: `${content.about.bubbles.length * 40 + 100}vh`,
                    }}
                >
                    <p
                        className="about-toptext text-white fs-4 text-center fw-bold mx-auto mt-6 pt-5"
                        dangerouslySetInnerHTML={{
                            __html: content.about.topText,
                        }}
                    />

                    {/* Container for Bubbles and Image */}
                    <div className="position-relative d-flex justify-content-center align-items-center flex-grow-1 w-100">
                        {content.about.bubbles.map((bubble, index) => {
                            const positions = [
                                {
                                    top: "5%",
                                    left: "20%",
                                    width: "300px",
                                    height: "300px",
                                },
                                {
                                    top: "10%",
                                    right: "5%",
                                    width: "350px",
                                    height: "350px",
                                },
                                {
                                    bottom: "15%",
                                    left: "3%",
                                    width: "290px",
                                    height: "290px",
                                },
                                {
                                    bottom: "10%",
                                    width: "400px",
                                    height: "400px",
                                },
                            ];

                            return (
                                <div
                                    key={index}
                                    className="about-bubble bg-white p-4 rounded-circle position-absolute d-flex align-items-center justify-content-center"
                                    style={positions[index % positions.length]}
                                >
                                    <p
                                        className="fw-semibold text-center fs-5 m-0"
                                        dangerouslySetInnerHTML={{
                                            __html: bubble,
                                        }}
                                    />
                                </div>
                            );
                        })}

                        {/* Image */}
                        <div
                            className="about-image rounded-circle position-absolute"
                            style={{
                                width: "250px",
                                height: "250px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2,
                                bottom: "-15%",
                                left: "25%",
                            }}
                        >
                            <img
                                src="1733157254607.jpg"
                                alt="Fotografia da Diana Fonte, fundadora da Divode"
                                className="w-100 h-100 object-fit-cover rounded-circle"
                            />
                        </div>
                    </div>
                </div>

                <div
                    ref={aboutCardsSectionRef}
                    id="about-content"
                    className="position-relative w-100 bg-blue py-5 px-5 mb-5"
                >
                    <div className="d-flex flex-column gap-2 maxw-md-80 w-md-75 w-lg-60 mx-auto my-5 px-4 px-md-0 pt-5 text-white">
                        <div>
                            <p
                                className="fw-bold fs-3 font-advent mb-2"
                                dangerouslySetInnerHTML={{
                                    __html: content.about.longText.p1,
                                }}
                            ></p>
                            <p
                                className="fw-bold fs-6"
                                dangerouslySetInnerHTML={{
                                    __html: content.about.longText.p2,
                                }}
                            ></p>
                        </div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: content.about.longText.p3,
                            }}
                        ></p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: content.about.longText.p4,
                            }}
                        ></p>
                    </div>
                    <div
                        className="d-flex gap-4 align-items-center justify-content-center flex-wrap px-4 w-100 mb-5"
                        style={{ maxWidth: "1400px" }}
                    >
                        {Object.values(content.about.horizontalText).map(
                            (text, index) => (
                                <Card
                                    key={index}
                                    className="about-card flex-shrink-0 p-4 d-flex align-items-center justify-content-center text-center rounded-4 border-0 shadow-lg"
                                    style={{ width: "200px" }}
                                >
                                    <p className="fs-6 fw-bold m-0">{text}</p>
                                </Card>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* ________________ CONTACTS ________________ */}
            <section
                id="contacts"
                ref={contactsRef}
                className="position-relative z-1 w-100 mx-auto px-5 px-md-0 mt-5"
            >
                <div
                    className="bg-layer"
                    data-section="contacts"
                    data-depth="0.2"
                    aria-hidden
                >
                    {floatersBySection.contacts.map((f) => (
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
                <div className="w-100 text-center justify-content-center align-items-center d-flex flex-column gap-4 pb-3 pb-md-5 mb-5">
                    <h2>{content.contacts.title}</h2>
                    <p className="w-75">{content.contacts.subtitle}</p>
                </div>

                <div className="w-100 maxw-md-80 mx-auto d-flex flex-column-reverse flex-md-row gap-5 gap-md-3 pt-md-5">
                    <div className="d-flex flex-column gap-5 justify-content-between">
                        <h3 className="fs-4">
                            {content.contacts.contacts.text}
                        </h3>
                        <div className="d-flex flex-column gap-3">
                            <Link to={"mailto:info@divode.io"} target="_blank">
                                <Icon icon="envelope" classes="me-1" />
                                {content.contacts.contacts.divode.email}
                            </Link>
                            <Link
                                to={"https://www.linkedin.com/company/divode/"}
                                target="_blank"
                            >
                                <Icon
                                    icon="linkedin"
                                    classes="me-1"
                                    type="brands"
                                />
                                {content.contacts.contacts.divode.linkedin}
                            </Link>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <Link to={"mailto:diana@divode.io"} target="_blank">
                                <Icon icon="envelope" classes="me-1" />
                                {content.contacts.contacts.diana.email}
                            </Link>
                            <Link
                                to={"https://www.linkedin.com/in/dianafonte/"}
                                target="_blank"
                            >
                                <Icon
                                    icon="linkedin"
                                    classes="me-1"
                                    type="brands"
                                />
                                {content.contacts.contacts.diana.linkedin}
                            </Link>
                            <Link
                                to={"https://github.com/dianafonte"}
                                target="_blank"
                            >
                                <Icon
                                    icon="github"
                                    classes="me-1"
                                    type="brands"
                                />
                                {content.contacts.contacts.diana.github}
                            </Link>
                            <Link
                                to={"https://medium.com/@diana_fonte"}
                                target="_blank"
                            >
                                <Icon
                                    icon="medium"
                                    classes="me-1"
                                    type="brands"
                                />
                                {content.contacts.contacts.diana.medium}
                            </Link>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img src="./triangleUp.svg" alt="Go to top" />
                        </Button>
                    </div>
                    <Card className="w-100">
                        <Form
                            onSubmit={formik.handleSubmit}
                            className="d-flex flex-column gap-3"
                        >
                            <Form.Group className="w-100">
                                <Form.Label htmlFor="nameInput">
                                    {content.contacts.form.label1}{" "}
                                    <span className="fs-8 text-blue-dark ms-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    id="nameInput"
                                    type="text"
                                    placeholder={
                                        content.contacts.form.placeholder1
                                    }
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={sendingEmail}
                                    isInvalid={
                                        !!formik.touched.name &&
                                        !!formik.errors.name
                                    }
                                ></Form.Control>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="text-red-dark"
                                >
                                    {formik.errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="w-100">
                                <Form.Label htmlFor="phoneInput">
                                    {content.contacts.form.label2}
                                </Form.Label>
                                <Form.Control
                                    id="phoneInput"
                                    type="phone"
                                    placeholder={
                                        content.contacts.form.placeholder2
                                    }
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={sendingEmail}
                                    isInvalid={
                                        !!formik.touched.phone &&
                                        !!formik.errors.phone
                                    }
                                ></Form.Control>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="text-red-dark"
                                >
                                    {formik.errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="w-100">
                                <Form.Label htmlFor="emailInput">
                                    {content.contacts.form.label3}{" "}
                                    <span className="fs-8 text-blue-dark ms-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    id="emailInput"
                                    type="email"
                                    placeholder={
                                        content.contacts.form.placeholder3
                                    }
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={sendingEmail}
                                    isInvalid={
                                        !!formik.touched.email &&
                                        !!formik.errors.email
                                    }
                                ></Form.Control>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="text-red-dark"
                                >
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="w-100">
                                <Form.Label htmlFor="messageInput">
                                    {content.contacts.form.label4}{" "}
                                    <span className="fs-8 text-blue-dark ms-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    id="messageInput"
                                    as="textarea"
                                    rows={5}
                                    placeholder={
                                        content.contacts.form.placeholder4
                                    }
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={sendingEmail}
                                    isInvalid={
                                        !!formik.touched.message &&
                                        !!formik.errors.message
                                    }
                                ></Form.Control>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="text-red-dark"
                                >
                                    {formik.errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="float-end d-flex flex-column gap-3 align-items-center">
                                <ReCAPTCHA
                                    sitekey={
                                        process.env.REACT_APP_RECAPTCHA_KEY!
                                    }
                                    onChange={handleCaptchaChange}
                                />

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={sendingEmail || !captchaValue}
                                    className="rounded-3"
                                >
                                    {content.contacts.form.submit}
                                    {sendingEmail ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        <Icon icon="paper-plane" />
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Homepage;
