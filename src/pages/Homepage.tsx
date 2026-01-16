import React, { useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import Icon from "../shared/Icon";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import { LANGUAGES } from "../constants/enums";
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
import { ReactComponent as MouseIcon } from "../assets/mouse.svg";

const Homepage = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

    const mouseWrapRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        //UNDERLINES
        const els = gsap.utils.toArray<HTMLElement>(".animated-underline");
        els.forEach((el) => {
            gsap.fromTo(
                el,
                { backgroundSize: "0% 2px" },
                {
                    backgroundSize: "100% 3px",
                    duration: 1.5,
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
        if (!line) return;
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
        <div className="d-flex align-items-center justify-content-center flex-column gap-4 mb-4">
            {/* ________________ LANDING ________________ */}
            <section
                id="landing"
                className="d-flex flex-column gap-4 align-items-center justify-content-between minh-100 w-content py-4 pb-5 px-5"
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
            <section id="services" className="position-relative w-100 px-5">
                <div className="sticky-top vh-100 d-flex flex-column justify-content-between align-items-center py-5 mt-5 w-content mx-auto z-2">
                    {/* Top Text */}
                    <p
                        className="text-center rounded px-3 py-2 mt-6 bg-glass-light z-2"
                        dangerouslySetInnerHTML={{
                            __html: content.services.topText,
                        }}
                    ></p>

                    {/* Bottom Text */}
                    <p
                        className="fs-4 fw-semibold rounded px-3 py-2 text-center bg-glass-light z-2"
                        dangerouslySetInnerHTML={{
                            __html: content.services.bottomText,
                        }}
                    />
                </div>

                <div className="z-1 position-relative mt-n45">
                    {/* Middle Text (Services) */}
                    {content.services.list.map((service, index) => (
                        <div className="h-90vh d-flex flex-column align-items-center justify-content-center gap-4 py-4">
                            <h2
                                key={index}
                                className="display-1 fw-bold text-center m-0"
                            >
                                {service}
                            </h2>
                        </div>
                    ))}
                </div>
            </section>

            {/* ________________ ABOUT (Bubbles) ________________ */}
            <div className="w-100">
                <section
                    id="about"
                    className="position-relative w-100 bg-blue z-3 px-5"
                    // Height = Bubbles * 40vh + 100vh (viewport)
                    style={{
                        height: `${content.about.bubbles.length * 40 + 100}vh`,
                    }}
                >
                    <div className="sticky-top vh-100 d-flex flex-column justify-content-center align-items-center">
                        <p
                            className="text-white fs-4 text-center fw-bold mx-auto mt-6 pt-5"
                            dangerouslySetInnerHTML={{
                                __html: content.about.topText,
                            }}
                        />

                        {/* Container for Bubbles and Image */}
                        <div
                            className="position-relative d-flex justify-content-center align-items-center flex-grow-1 w-100"
                        >
                            {/* Bubbles */}
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
                                        className="bg-white p-4 rounded-circle position-absolute d-flex align-items-center justify-content-center"
                                        style={{
                                            ...positions[
                                                index % positions.length
                                            ],
                                        }}
                                    >
                                        <p
                                            className="fw-semibold text-center fs-5 m-0"
                                            dangerouslySetInnerHTML={{
                                                __html: bubble,
                                            }}
                                        ></p>
                                    </div>
                                );
                            })}

                            {/* Image - Appears after bubbles */}
                            <div
                                className="rounded-circle position-absolute"
                                style={{
                                    // opacity: showAboutImage ? 1 : 0,
                                    transition: "opacity 0.5s ease-in-out",
                                    width: "250px",
                                    height: "250px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 2,
                                    backgroundColor: "transparent",
                                    bottom: "-15%",
                                    left: "25%",
                                }}
                            >
                                <img
                                    src="1733157254607.jpg"
                                    alt="Fotografia da Diana Fonte, fundadora da Divode"
                                    className="rounded w-100 h-100 object-fit-cover rounded-circle"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ________________ ABOUT (Content) ________________ */}
                <section
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

                    <div className="position-sticky w-100 bg-blue overflow-hidden d-flex flex-column align-items-center justify-content-center py-5">
                        <div
                            className="d-flex gap-4 align-items-center justify-content-center flex-wrap px-4 w-100"
                            style={{ maxWidth: "1400px" }}
                        >
                            {/* Cards */}
                            {Object.values(content.about.horizontalText).map(
                                (text, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            className={`flex-shrink-0 p-4 d-flex align-items-center justify-content-center text-center rounded-4 border-0 shadow-lg about-card-${index}`}
                                            style={{
                                                width: "200px",
                                            }}
                                        >
                                            <p className="fs-6 fw-bold m-0">
                                                {text}
                                            </p>
                                        </Card>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* ________________ CONTACTS ________________ */}
            <section
                id="contacts"
                className="w-100 maxw-md-80 mx-auto px-5 px-md-0 mt-5"
            >
                <div className="w-100 text-center justify-content-center align-items-center d-flex flex-column gap-4 pb-3 pb-md-5 mb-5">
                    <h2>{content.contacts.title}</h2>
                    <p className="w-75">{content.contacts.subtitle}</p>
                </div>

                <div className="d-flex flex-column-reverse flex-md-row gap-5 gap-md-3 pt-md-5">
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
                                    rows={10}
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
        </div>
    );
};

export default Homepage;
