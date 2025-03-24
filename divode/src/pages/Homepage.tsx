import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import Icon from '../components/Icon';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../constants/translations';
import { LANGUAGES } from '../constants/enums';
import { Button, Form, Spinner } from 'react-bootstrap';
import emailjs from "@emailjs/browser";
import { toast } from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";

const Homepage = () => {
    const {language, toggleLanguage} = useLanguage();
    const content = TRANSLATIONS[language];
    const [activeSection, setActiveSection] = useState("");
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const sendEmail = (e) => {
        setSendingEmail(true)
        e.preventDefault();

        if(!captchaValue){
            toast.error(content.contacts.form.recaptcha, {
                position: "top-right"
            });
        } else{
            emailjs
          .send(
            "service_9g7zlrd",    // Replace with your EmailJS Service ID
            language === LANGUAGES.pt ? "template_ohw6rew" : "template_0kro2rj",   // Replace with your EmailJS Template ID
            formData,
            "LKjM7JJEaUDW7Jx6z"     // Replace with your EmailJS Public Key
          )
          .then(
            (response) => {
                setSendingEmail(false)
                toast.success(content.contacts.form.success, {
                    position: "top-right"
                  });
                setFormData({ name: "", email: "", message: "" });
            },
            (error) => {
                setSendingEmail(false)
                toast.error(content.contacts.form.error, {
                    position: "top-right"
                });
                console.log(error)
            }
          );
        }    
      };

    useEffect(() => {
        const sections = document.querySelectorAll(".section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);
    
    return (<div>
        <header className='header'>
            <HashLink smooth to={'./#landing'}>
                <h1><img src={'./divode_logo.png'} alt="Divode logotipo em tons de azul" className='logo' /></h1>
            </HashLink>
            <nav>
                <ul>
                    <li className={activeSection === "services" ? "active" : ""}>
                        <HashLink smooth to={'./#services'}>{content.menu.services}</HashLink>
                    </li>
                    <li className={activeSection === "about" ? "active" : ""}>
                        <HashLink smooth to={'./#about'}>{content.menu.about}</HashLink>
                    </li>
                    <li className={activeSection === "contacts" ? "active" : ""}>
                        <HashLink smooth to={'./#contacts'}>{content.menu.contacts}</HashLink>
                    </li>
                </ul>
                <Button variant='Link' onClick={toggleLanguage}>
                    {language === LANGUAGES.pt ? 'EN' : 'PT'}
                    <img src={language === LANGUAGES.pt ? './flag/GB.svg' : './flag/PT.svg'} alt="language flag" />
                </Button>
            </nav>
        </header>

        <main>
            <section id="landing" className='section'>
                <div>
                    <img src='illustration_1.png' className='illustration1'></img>
                    <img src='illustration_2.png' className='illustration2'></img>
                </div>
                <div>
                    <div>
                        <h2>{content.landing.title}</h2>
                        <div>
                            <span className='me-1'>{content.landing.by}</span>
                            <Link to={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>{content.landing.author}</Link>
                        </div>
                    </div>
                    <h3>{content.landing.subtitle}</h3>
                </div>
            </section>

            {content.services &&
                <section id="services" className='section'>
                    <div>
                        <h2>
                            <Icon icon="palette" />
                            <span>{content.services.design.title}</span>
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.design.hmtl }}></p>
                    </div>
                    <div>
                        <h2>
                            <Icon icon="code" />
                            <span>{content.services.development.title}</span>
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.development.html }}></p>
                    </div>
                    <div>
                        <h2>
                            <Icon icon="wifi" />
                            <span>{content.services.domains.title}</span>
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.domains.html }}></p>
                    </div>
                    <div>
                        <h2>
                            <Icon icon="screwdriver-wrench" />
                            <span>{content.services.management.title}</span>
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.management.html }}></p>
                    </div>
                </section>
            }

            <section id="about" className='section'>
                <img src='illustration_3.png' className='illustration3'></img>
                <p dangerouslySetInnerHTML={{ __html: content.about.p1 }}></p>
                <p dangerouslySetInnerHTML={{ __html: content.about.p2 }}></p>
                <div>
                    <img src='1733157254607.jpg' alt='fotografia de Diana Fonte'></img>
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: content.about.p3 }}></p>
                        <p dangerouslySetInnerHTML={{ __html: content.about.p4 }}></p>
                        <div>
                            <a href={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>
                                <Icon icon="linkedin" type='brands'/>
                            </a>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>

            <section id="contacts" className='section'>
                <div className='contacts_header'>
                    <div>
                        <p>{content.contacts.subtitle}</p>
                        <Link to={`mailto:info@divode.io`}>
                            <h2>
                                {content.contacts.title}    
                            </h2>
                        </Link>
                    </div>
                    <img src='illustration_4.png' className='illustration4'></img>
                </div>

                <Form onSubmit={sendEmail}>
                    <Form.Group className='w-100'>
                        <Form.Label>{content.contacts.form.label1} <span className='label-extra'>{content.contacts.form.mandatory}</span></Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder={content.contacts.form.placeholder1}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={sendingEmail}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='w-100'>
                        <Form.Label>{content.contacts.form.label3} <span className='label-extra'>{content.contacts.form.mandatory}</span></Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder={content.contacts.form.placeholder3}
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={sendingEmail}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='w-100'>
                        <Form.Label>{content.contacts.form.label4} <span className='label-extra'>{content.contacts.form.mandatory}</span></Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={10} 
                            placeholder={content.contacts.form.placeholder4}
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            required
                            disabled={sendingEmail}
                        ></Form.Control>
                    </Form.Group>

                    <ReCAPTCHA
                        sitekey="6LcC1_4qAAAAAAiLm5W11KHh-OTYtQXbWagjz4aL"
                        onChange={handleCaptchaChange}
                    />

                    <Button variant="primary" type="submit" disabled={sendingEmail || !captchaValue}>
                        {content.contacts.form.submit}
                        {sendingEmail
                            ? <Spinner animation="border" size="sm" />
                            : <Icon icon='paper-plane' />
                        }
                    </Button>
                </Form>
            </section>
        </main>

        <footer>
            <div>
                <HashLink smooth to={'./#landing'}>{content.menu.home}</HashLink>
                <HashLink smooth to={'./#services'}>{content.menu.services}</HashLink>
                <HashLink smooth to={'./#about'}>{content.menu.about}</HashLink>
                <HashLink smooth to={'./#contacts'}>{content.menu.contacts}</HashLink>
                <p className='copyright'>{content.footer.copyright}</p>
            </div>
            <div>
                <img src='./divode_logo_white.png' alt='Divode logotipo em branco'></img>
                <p>{content.footer.subtitle}</p>
                <Link to={`mailto:info@divode.io`} className='email'>
                    <Icon icon="envelope" />
                    {content.footer.email}
                </Link>
                <Link to={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>
                    <Icon icon="linkedin" type='brands'/>
                </Link>
            </div>
            <img src='illustration_5.png' className='illustration5'></img>
        </footer>
    </div>)
};

export default Homepage;