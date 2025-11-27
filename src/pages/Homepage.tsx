import React, { useEffect, useState, useRef } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";

const Homepage = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    // Services Scroll Logic
    const servicesRef = useRef<HTMLDivElement>(null);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (servicesRef.current) {
                const { top, height } =
                    servicesRef.current.getBoundingClientRect();
                const scrollPosition = -top;
                const sectionHeight = height - window.innerHeight; // Scrollable distance

                if (scrollPosition >= 0 && scrollPosition <= sectionHeight) {
                    const progress = scrollPosition / sectionHeight;
                    // Ensure index is within bounds
                    const index = Math.min(
                        Math.max(
                            0,
                            Math.floor(progress * content.services.list.length)
                        ),
                        content.services.list.length - 1
                    );
                    setCurrentServiceIndex(index);
                } else if (scrollPosition < 0) {
                    setCurrentServiceIndex(0);
                } else if (scrollPosition > sectionHeight) {
                    setCurrentServiceIndex(content.services.list.length - 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [content.services.list.length]);

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validate: (values) => {
            const errors: { name?: string; email?: string; message?: string } =
                {};
            if (!values.name) {
                errors.name = content.contacts.form.mandatoryError;
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
                        email: values.email,
                        message: values.message,
                    },
                    process.env.REACT_APP_EMAILJS_USER_ID
                )
                .then(
                    () => {
                        setSendingEmail(false);
                        toast.success(content.contacts.form.success, {
                            position: "top-right",
                        });
                        resetForm();
                        setCaptchaValue(null);
                    },
                    (error) => {
                        setSendingEmail(false);
                        toast.error(content.contacts.form.error, {
                            position: "top-right",
                        });
                        console.log(error);
                    }
                );
        },
    });

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center flex-column gap-4">
            {/* ________________ LANDING ________________ */}
            <section
                id="landing"
                className="d-flex flex-column gap-4 align-items-center justify-content-between minh-100 w-content py-4"
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
                        className={"btn btn-primary"}
                    >
                        {content.landing.cta}
                    </HashLink>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                    <p className="mb-0 fs-8">{content.landing.scroll}</p>
                    <img src="./mouse.svg" alt="" />
                </div>
            </section>

            {/* ________________ SERVICES ________________ */}
            <section
                id="services"
                ref={servicesRef}
                className="position-relative w-100"
            >
                <div className="sticky-top vh-100 d-flex flex-column justify-content-between align-items-center py-5 w-content mx-auto">
                    {/* Top Text */}
                    <p
                        className="w-md-75 text-center mt-5 pt-5"
                        dangerouslySetInnerHTML={{
                            __html: content.services.topText,
                        }}
                    ></p>

                    {/* Bottom Text */}
                    <p
                        className="fs-4 fw-semibold text-center"
                        dangerouslySetInnerHTML={{
                            __html: content.services.bottomText,
                        }}
                    />
                </div>

                <div>
                    {/* Middle Text (Services) */}
                    {content.services.list.map((service, index) => (
                        <div className="vh-100 d-flex flex-column align-items-center justify-content-center gap-4 py-4">
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

            {/* ________________ ABOUT ________________ */}
            <section
                id="about"
                className="d-flex flex-column-reverse flex-md-row gap-4 maxw-md-80 mx-auto px-4 px-md-0 align-items-start align-items-xl-stretch"
            >
                <Card
                    data-aos="fade-right"
                    className="w-100 p-4 justify-content-center"
                >
                    <p
                        className="fw-bold fs-3 font-advent mb-4"
                        dangerouslySetInnerHTML={{
                            __html: content.about.p1,
                        }}
                    ></p>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: content.about.p2,
                        }}
                    ></p>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: content.about.p3,
                        }}
                    ></p>
                </Card>
                <img
                    data-aos="fade-left"
                    src="1733157254607.jpg"
                    alt="Fotografia da Diana Fonte, fundadora da Divode"
                    className="rounded w-50 w-sm-25 h-auto"
                ></img>
            </section>

            {/* ________________ CONTACTS ________________ */}
            <section
                data-aos="fade-up"
                id="contacts"
                className="w-100 maxw-md-80 mx-auto px-4 px-md-0"
            >
                <h2>{content.contacts.title}</h2>
                <p>{content.contacts.subtitle}</p>

                <Card className="mt-4 w-100">
                    <Form
                        onSubmit={formik.handleSubmit}
                        className="d-flex flex-column gap-3"
                    >
                        <Form.Group className="w-100">
                            <Form.Label htmlFor="nameInput">
                                {content.contacts.form.label1}{" "}
                                <span className="fs-8 text-red-dark ms-2">
                                    {content.contacts.form.mandatory}
                                </span>
                            </Form.Label>
                            <Form.Control
                                id="nameInput"
                                type="text"
                                placeholder={content.contacts.form.placeholder1}
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
                            <Form.Label htmlFor="emailInput">
                                {content.contacts.form.label3}{" "}
                                <span className="fs-8 text-red-dark ms-2">
                                    {content.contacts.form.mandatory}
                                </span>
                            </Form.Label>
                            <Form.Control
                                id="emailInput"
                                type="email"
                                placeholder={content.contacts.form.placeholder3}
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
                                <span className="fs-8 text-red-dark ms-2">
                                    {content.contacts.form.mandatory}
                                </span>
                            </Form.Label>
                            <Form.Control
                                id="messageInput"
                                as="textarea"
                                rows={10}
                                placeholder={content.contacts.form.placeholder4}
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
                                sitekey={process.env.REACT_APP_RECAPTCHA_KEY!}
                                onChange={handleCaptchaChange}
                            />

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={sendingEmail || !captchaValue}
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
            </section>
        </div>
    );
};

export default Homepage;
