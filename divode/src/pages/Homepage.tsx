import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import Icon from '../components/Icon';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../constants/translations';
import { LANGUAGES } from '../constants/enums';
import { Button, Form } from 'react-bootstrap';

const Homepage = () => {
    const {language, toggleLanguage} = useLanguage();
    const content = TRANSLATIONS[language]


    useEffect(() => {
        console.log(language)
        console.log(content)
    })
    return (<div>
        <header className='header'>
            <HashLink smooth to={'./#landing'}>
                <h1><img src={'./divode_logo.png'} alt="Divode logotipo em tons de azul" className='logo' /></h1>
            </HashLink>
            <nav>
                <ul>
                    <li><HashLink smooth to={'./#services'}>{content.menu.services}</HashLink></li>
                    <li><HashLink smooth to={'./#about'}>{content.menu.about}</HashLink></li>
                    <li><HashLink smooth to={'./#contacts'}>{content.menu.contacts}</HashLink></li>
                </ul>
                <Button variant='Link' onClick={toggleLanguage}>
                    {language === LANGUAGES.pt ? 'EN' : 'PT'}
                    <img src={language === LANGUAGES.pt ? './flag/GB.svg' : './flag/PT.svg'} alt="language flag" />
                </Button>
            </nav>
        </header>

        <main>
            <div id="landing">
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
            </div>

            {content.services &&
                <div id="services">
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
                </div>
            }

            <div id="about">
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
            </div>

            <div id="contacts">
                <div>
                    <div>
                        <p>{content.contacts.subtitle}</p>
                        <Link to={`mailto:'divodedigitalservices'`}>
                            <h2>
                                {content.contacts.title}    
                            </h2>
                        </Link>
                    </div>
                    <img src='illustration_4.png' className='illustration4'></img>
                </div>

                <Form>
                    <Form.Group>
                        <Form.Label>{content.contacts.form.label1} <span className='label-extra'>{content.contacts.form.mandatory}</span></Form.Label>
                        <Form.Control type='text' placeholder={content.contacts.form.placeholder1}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{content.contacts.form.label2}</Form.Label>
                        <Form.Control type='number' placeholder={content.contacts.form.placeholder2}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{content.contacts.form.label3} <span className='label-extra'>{content.contacts.form.mandatory}</span></Form.Label>
                        <Form.Control type='email' placeholder={content.contacts.form.placeholder3}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>{content.contacts.form.label4} <span className='label-extra'>{content.contacts.form.mandatory}</span></Form.Label>
                        <Form.Control as="textarea" rows={10} placeholder={content.contacts.form.placeholder4}></Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {content.contacts.form.submit}
                        <Icon icon='paper-plane' />
                    </Button>
                </Form>
            </div>
        </main>

        <footer>
            <div>
                <HashLink smooth to={'./#landing'}>{content.menu.home}</HashLink>
                <HashLink smooth to={'./#services'}>{content.menu.services}</HashLink>
                <HashLink smooth to={'./#about'}>{content.menu.about}</HashLink>
                <HashLink smooth to={'./#contact'}>{content.menu.contacts}</HashLink>
                <p className='copyright'>{content.footer.copyright}</p>
            </div>
            <div>
                <img src='./divode_logo_white.png' alt='Divode logotipo em branco'></img>
                <p>{content.footer.subtitle}</p>
                <Link to={`mailto:'divodedigitalservices'`} className='email'>
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