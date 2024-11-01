import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import Icon from '../components/Icon';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../constants/translations';
import { LANGUAGES } from '../constants/enums';
import { Button } from 'react-bootstrap';

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
            <nav className='d-flex gap-5 align-items-center'>
                <ul className='d-none d-md-flex gap-5 align-items-center m-0 p-0'>
                    <li><HashLink smooth to={'./#services'}>{content.menu.services}</HashLink></li>
                    <li><HashLink smooth to={'./#about'}>{content.menu.about}</HashLink></li>
                    <li><HashLink smooth to={'./#contacts'}>{content.menu.contacts}</HashLink></li>
                </ul>
                <Button variant='Link' onClick={toggleLanguage}>
                    {language === LANGUAGES.pt ? 'PT' : 'EN'}
                </Button>
            </nav>
        </header>

        <main>
            <div id="landing">
                <div className='w-fit-content'>
                    <h2>{content.landing.title}</h2>
                    <div>
                        <span className='me-1'>{content.landing.by}</span>
                        <Link to={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>{content.landing.author}</Link>
                    </div>
                </div>
                <h3>{content.landing.subtitle}</h3>
            </div>

            {content.services &&
                <div id="servicos">
                    <div>
                        <h2>
                            <Icon icon="palette" />
                            {content.services.design.title}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.design.hmtl }}></p>
                    </div>
                    <div>
                        <h2>
                            <Icon icon="code" />
                            {content.services.development.title}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.development.html }}></p>
                    </div>
                    <div>
                        <h2>
                            <Icon icon="wifi" />
                            {content.services.domains.title}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.domains.html }}></p>
                    </div>
                    <div>
                        <h2>
                            <Icon icon="screwdriver-wrench" />
                            {content.services.management.title}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: content.services.management.html }}></p>
                    </div>
                </div>
            }

            <div id="about">
                <p dangerouslySetInnerHTML={{ __html: content.about.p1 }}></p>
                <p dangerouslySetInnerHTML={{ __html: content.about.p2 }}></p>
                <div>
                    <img src='' alt='Diana Fonte fotografia'></img>
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: content.about.p3 }}></p>
                        <p dangerouslySetInnerHTML={{ __html: content.about.p4 }}></p>
                        <div>
                            <Icon icon="linkedin" type='brands'/>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div id="contacts">
                <p>{content.contacts.subtitle}</p>
                <Link to={`mailto:'divodedigitalservices'`}>
                    <h2>
                        {content.contacts.title}    
                    </h2>
                </Link>
                <form>
                    <label>{content.contacts.form.label1} {content.contacts.form.mandatory}</label>
                    <input type='text'></input>
                    ...
                </form>
            </div>
        </main>

        <footer>
            <div>
                <HashLink smooth to={'./#landing'}>{content.menu.home}</HashLink>
                <HashLink smooth to={'./#services'}>{content.menu.services}</HashLink>
                <HashLink smooth to={'./#about'}>{content.menu.about}</HashLink>
                <HashLink smooth to={'./#contact'}>{content.menu.contacts}</HashLink>
                <p>{content.footer.copyright}</p>
            </div>
            <div>
                <img src='./divode_logo_white.png' alt='Divode logotipo em branco'></img>
                <p>{content.footer.subtitle}</p>
                <Link to={`mailto:'divodedigitalservices'`}>
                    <Icon icon="envelope" />
                    {content.footer.email}
                </Link>
                <Link to={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>
                    <Icon icon="linkedin" type='brands'/>
                </Link>
            </div>
        </footer>
    </div>)
};

export default Homepage;