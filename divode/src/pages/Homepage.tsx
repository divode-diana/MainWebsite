import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const { language, toggleLanguage } = useLanguage();
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
                    "service_9g7zlrd", // Replace with your EmailJS Service ID
                    language === LANGUAGES.pt
                        ? "template_ohw6rew"
                        : "template_0kro2rj", // Replace with your EmailJS Template ID
                    formData,
                    "LKjM7JJEaUDW7Jx6z" // Replace with your EmailJS Public Key
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
        <div>
            <div className="z-1 w-100 d-flex justify-content-center position-absolute top-0 mt-4">
                <header className="d-flex align-items-center justify-content-between h-30px h-md-50px maxw-md-80 w-100 px-4 px-md-0">
                    <HashLink smooth to={"./#landing"}>
                        <h1>
                            <img
                                src={"./divode_logo.png"}
                                alt="Divode escrito em branco"
                                className="h-30px h-md-50px w-auto"
                            />
                        </h1>
                    </HashLink>
                    <nav>
                        <Button
                            variant="Link"
                            onClick={toggleLanguage}
                            className="d-flex align-items-center gap-2"
                        >
                            {language === LANGUAGES.pt ? "EN" : "PT"}
                            <img
                                src={
                                    language === LANGUAGES.pt
                                        ? "./flag/GB.svg"
                                        : "./flag/PT.svg"
                                }
                                alt="language flag"
                                className="h-15px w-auto"
                            />
                        </Button>
                    </nav>
                </header>
            </div>

            <main className="d-flex align-items-center justify-content-center flex-column gap-8">
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
                                            __html: content.services.design
                                                .hmtl,
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
                                            __html: content.services.domains
                                                .html,
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
                                <Form.Label>
                                    {content.contacts.form.label1}{" "}
                                    <span className="fs-8 text-brown ms-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={
                                        content.contacts.form.placeholder1
                                    }
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={sendingEmail}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="w-100">
                                <Form.Label>
                                    {content.contacts.form.label3}{" "}
                                    <span className="fs-8 text-brown ms-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={
                                        content.contacts.form.placeholder3
                                    }
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={sendingEmail}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="w-100">
                                <Form.Label>
                                    {content.contacts.form.label4}{" "}
                                    <span className="fs-8 text-brown ms-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    placeholder={
                                        content.contacts.form.placeholder4
                                    }
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={sendingEmail}
                                ></Form.Control>
                            </Form.Group>

                            <div className="float-end d-flex flex-column gap-3 align-items-center">
                                <ReCAPTCHA
                                    sitekey="6LcC1_4qAAAAAAiLm5W11KHh-OTYtQXbWagjz4aL"
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
            </main>

            <footer className="w-100 mt-5 d-flex flex-column align-items-center gap-4 mb-4">
                <div className="d-flex gap-5 fs-2">
                    <a
                        href="mailto:info@divode.io"
                        className="email"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon icon="envelope" />
                    </a>
                    <Link
                        to={"https://www.linkedin.com/in/dianafonte/"}
                        target="_blank"
                    >
                        <Icon icon="linkedin" type="brands" />
                    </Link>
                </div>
                <p className="fs-8">{content.footer.copyright}</p>
            </footer>
        </div>
    );
};

export default Homepage;
