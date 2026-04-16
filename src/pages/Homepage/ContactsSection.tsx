import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Icon from "../../components/shared/Icon";
import { LANGUAGES } from "../../constants/enums";
import { TRANSLATIONS } from "../../constants/translations";

type Props = {
    content: (typeof TRANSLATIONS)[number];
    language: LANGUAGES;
};

const ContactsSection = ({ content, language }: Props) => {
    const [emailStatus, setEmailStatus] = useState<
        "" | "sending" | "success" | "error"
    >("");
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

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

            setEmailStatus("sending");

            const templateId =
                language === LANGUAGES.pt
                    ? import.meta.env.VITE_EMAILJS_TEMPLATE_ID_PT!
                    : import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ENG!;

            const templateParams = {
                name: values.name,
                phone: values.phone,
                email: values.email,
                message: values.message,
            };

            emailjs
                .send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID!,
                    templateId,
                    templateParams,
                    import.meta.env.VITE_EMAILJS_USER_ID,
                )
                .then(
                    () => {
                        setEmailStatus("success");
                        resetForm();
                        setCaptchaValue(null);

                        emailjs.send(
                            import.meta.env.VITE_EMAILJS_SERVICE_ID!,
                            templateId,
                            {
                                ...templateParams,
                                email: "costafonte.dp@gmail.com",
                            },
                            import.meta.env.VITE_EMAILJS_USER_ID,
                        );
                    },
                    (error) => {
                        setEmailStatus("error");
                        console.log(error);
                    },
                );
        },
    });

    return (
        <section
            id="contacts"
            className="relative z-10 w-full mx-auto px-5 md:px-0 my-10 flex flex-col gap-7"
        >
            <div className="w-full text-center flex flex-col items-center justify-center gap-4 pb-3 md:pb-5 my-5">
                <h2 className="text-3xl">{content.contacts.title}</h2>
                <p className="w-3/4">{content.contacts.subtitle}</p>
            </div>

            <div className="w-full md:max-w-[80vw] mx-auto flex flex-col-reverse md:flex-row gap-5 md:gap-6 md:pt-5">
                <div className="flex flex-col gap-5 justify-between items-center md:items-start">
                    <h3 className="text-xl hidden md:block">
                        {content.contacts.contacts.text}
                    </h3>
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Link to={"mailto:info@divode.io"} target="_blank">
                            <Icon icon="envelope" classes="mr-1" />
                            {content.contacts.contacts.divode.email}
                        </Link>
                        <Link
                            to={"https://www.linkedin.com/company/divode/"}
                            target="_blank"
                        >
                            <Icon icon="linkedin" classes="mr-1" type="brands" />
                            {content.contacts.contacts.divode.linkedin}
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3 items-center md:items-start">
                        <Link to={"mailto:diana@divode.io"} target="_blank">
                            <Icon icon="envelope" classes="mr-1" />
                            {content.contacts.contacts.diana.email}
                        </Link>
                        <Link
                            to={"https://www.linkedin.com/in/dianafonte/"}
                            target="_blank"
                        >
                            <Icon icon="linkedin" classes="mr-1" type="brands" />
                            {content.contacts.contacts.diana.linkedin}
                        </Link>
                        <Link
                            to={"https://github.com/dianafonte"}
                            target="_blank"
                        >
                            <Icon icon="github" classes="mr-1" type="brands" />
                            {content.contacts.contacts.diana.github}
                        </Link>
                        <Link
                            to={"https://medium.com/@diana_fonte"}
                            target="_blank"
                        >
                            <Icon icon="medium" classes="mr-1" type="brands" />
                            {content.contacts.contacts.diana.medium}
                        </Link>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <img src="./triangleUp.svg" alt="Go to top" />
                    </button>
                </div>

                <div className="card w-full flex justify-center items-center">
                    {emailStatus === "success" || emailStatus === "error" ? (
                        <div className="flex flex-col gap-4 mx-5 justify-center items-center">
                            <img
                                src={
                                    emailStatus === "success"
                                        ? "undraw_happy-news_d5bt 1.svg"
                                        : "undraw_cancel_7zdh 1.svg"
                                }
                                alt="Illustração do erro ou sucesso do formulário de contacto"
                                className="w-1/2 h-full object-cover rounded-full"
                            />
                            <h4>
                                {emailStatus === "success"
                                    ? content.contacts.form.success.title
                                    : content.contacts.form.error.title}
                            </h4>
                            <p className="text-center">
                                {emailStatus === "success"
                                    ? content.contacts.form.success.text
                                    : content.contacts.form.error.text}
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={formik.handleSubmit}
                            className="flex flex-col gap-3 w-full"
                        >
                            <h3 className="text-lg md:hidden mb-4">
                                {content.contacts.contacts.text}
                            </h3>

                            <div className="w-full">
                                <label htmlFor="nameInput" className="block mb-1">
                                    {content.contacts.form.label1}{" "}
                                    <span className="text-[0.7rem] text-blue-800 ml-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </label>
                                <input
                                    id="nameInput"
                                    type="text"
                                    placeholder={content.contacts.form.placeholder1}
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={emailStatus === "sending"}
                                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${!!formik.touched.name && !!formik.errors.name ? "border-red-600" : "border-gray-300"}`}
                                />
                                {!!formik.touched.name && !!formik.errors.name && (
                                    <p className="text-red-dark text-sm mt-1">
                                        {formik.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label htmlFor="phoneInput" className="block mb-1">
                                    {content.contacts.form.label2}
                                </label>
                                <input
                                    id="phoneInput"
                                    type="tel"
                                    placeholder={content.contacts.form.placeholder2}
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={emailStatus === "sending"}
                                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${!!formik.touched.phone && !!formik.errors.phone ? "border-red-600" : "border-gray-300"}`}
                                />
                                {!!formik.touched.phone && !!formik.errors.phone && (
                                    <p className="text-red-dark text-sm mt-1">
                                        {formik.errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label htmlFor="emailInput" className="block mb-1">
                                    {content.contacts.form.label3}{" "}
                                    <span className="text-[0.7rem] text-blue-800 ml-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </label>
                                <input
                                    id="emailInput"
                                    type="email"
                                    placeholder={content.contacts.form.placeholder3}
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={emailStatus === "sending"}
                                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${!!formik.touched.email && !!formik.errors.email ? "border-red-600" : "border-gray-300"}`}
                                />
                                {!!formik.touched.email && !!formik.errors.email && (
                                    <p className="text-red-dark text-sm mt-1">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="messageInput"
                                    className="block mb-1"
                                >
                                    {content.contacts.form.label4}{" "}
                                    <span className="text-[0.7rem] text-blue-800 ml-2">
                                        {content.contacts.form.mandatory}
                                    </span>
                                </label>
                                <textarea
                                    id="messageInput"
                                    rows={5}
                                    placeholder={content.contacts.form.placeholder4}
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={emailStatus === "sending"}
                                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none ${!!formik.touched.message && !!formik.errors.message ? "border-red-600" : "border-gray-300"}`}
                                />
                                {!!formik.touched.message &&
                                    !!formik.errors.message && (
                                        <p className="text-red-dark text-sm mt-1">
                                            {formik.errors.message}
                                        </p>
                                    )}
                            </div>

                            <div className="self-center flex flex-col gap-3 items-center justify-center">
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_KEY!}
                                    onChange={handleCaptchaChange}
                                />
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={
                                        emailStatus === "sending" || !captchaValue
                                    }
                                >
                                    {content.contacts.form.submit}
                                    {emailStatus === "sending" ? (
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Icon icon="paper-plane" />
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactsSection;
