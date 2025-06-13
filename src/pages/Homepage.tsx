import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import Icon from "../components/Icon";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../constants/translations";
import { LANGUAGES } from "../constants/enums";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import AOS from "aos";
import "aos/dist/aos.css";

const Homepage = () => {
    const { language } = useLanguage();
    const content = TRANSLATIONS[language];
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const sendEmail = (e) => {
        setSendingEmail(true);
        e.preventDefault();

        if (!captchaValue) {
            toast.error(content.contacts.form.recaptcha, {
                position: "top-right",
            });
        } else {
            emailjs
                .send(
                    process.env.REACT_APP_EMAILJS_SERVICE_ID!,
                    language === LANGUAGES.pt
                        ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID_PT!
                        : process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ENG!,
                    formData,
                    process.env.REACT_APP_EMAILJS_USER_ID // Replace with your EmailJS Public Key
                )
                .then(
                    (response) => {
                        setSendingEmail(false);
                        toast.success(content.contacts.form.success, {
                            position: "top-right",
                        });
                        setFormData({ name: "", email: "", message: "" });
                    },
                    (error) => {
                        setSendingEmail(false);
                        toast.error(content.contacts.form.error, {
                            position: "top-right",
                        });
                        console.log(error);
                    }
                );
        }
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center flex-column gap-5 gap-lg-8">
            <section
                id="landing"
                className="d-flex flex-column gap-4 align-items-center justify-content-center minh-100 w-100 overflow-clip px-5"
            >
                <h2 className="text-white fs-1 text-center">
                    {content.landing.title}
                </h2>
                <h3 className="text-white fs-4 text-center">
                    {content.landing.subtitle}
                </h3>
                <HashLink
                    smooth
                    to={"./#contacts"}
                    className={"btn btn-primary"}
                >
                    {content.landing.cta}
                </HashLink>
            </section>

            <section
                data-aos="fade-up"
                id="services"
                className="maxw-md-80 mx-auto px-4 px-md-0"
            >
                <h2>{content.services.title}</h2>
                <p>{content.services.subtitle}</p>
                <div className="container maxw-100 mt-4 p-0">
                    <div className="row g-4 d-flex flex-wrap">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <Card className="gap-2 h-100">
                                <Icon
                                    icon="palette"
                                    classes="text-light-blue"
                                />
                                <h3 className="fs-4 m-0">
                                    {content.services.design.title}
                                </h3>
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: content.services.design.hmtl,
                                    }}
                                ></p>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <Card className="gap-2 h-100">
                                <Icon icon="code" classes="text-teal" />
                                <h3 className="fs-4 m-0">
                                    {content.services.development.title}
                                </h3>
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: content.services.development
                                            .html,
                                    }}
                                ></p>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <Card className="gap-2 h-100">
                                <Icon icon="wifi" classes="text-blue" />
                                <h3 className="fs-4 m-0">
                                    {content.services.domains.title}
                                </h3>
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: content.services.domains.html,
                                    }}
                                ></p>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <Card className="gap-2 h-100">
                                <Icon
                                    icon="screwdriver-wrench"
                                    classes="text-dark-blue"
                                />
                                <h3 className="fs-4 m-0">
                                    {content.services.management.title}
                                </h3>
                                <p
                                    className="m-0"
                                    dangerouslySetInnerHTML={{
                                        __html: content.services.management
                                            .html,
                                    }}
                                ></p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

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
                    alt="fotografia de Diana Fonte"
                    className="rounded w-50 w-sm-25 h-auto"
                ></img>
            </section>

            <section
                data-aos="fade-up"
                id="contacts"
                className="w-100 maxw-md-80 mx-auto px-4 px-md-0"
            >
                <h2>{content.contacts.title}</h2>
                <p>{content.contacts.subtitle}</p>

                <Card className="mt-4 w-100">
                    <Form
                        onSubmit={sendEmail}
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
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={sendingEmail}
                            ></Form.Control>
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
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={sendingEmail}
                            ></Form.Control>
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
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={sendingEmail}
                            ></Form.Control>
                        </Form.Group>

                        <div className="float-end d-flex flex-column gap-3 align-items-center">
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
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
