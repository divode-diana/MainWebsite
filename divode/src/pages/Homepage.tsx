import React from 'react';
import { Link } from "react-router-dom"
import { TRANSLATIONS } from "../constants/translations"
import Icon from '../components/Icon';
import { HashLink } from 'react-router-hash-link';

const Homepage = () => {
    return (<div>
        <header className='d-flex justify-content-between align-items-center gap-3'>
            <HashLink smooth to={'./#landing'}>
                <h1><img src={'./divode_logo.png'} alt="Divode logotipo em tons de azul" /></h1>
            </HashLink>
            <ul className='d-none d-md-flex gap-3 align-items-center'>
                <li><HashLink smooth to={'./#services'}>{TRANSLATIONS.Menu.services}</HashLink></li>
                <li><HashLink smooth to={'./#about'}>{TRANSLATIONS.Menu.about}</HashLink></li>
                <li><HashLink smooth to={'./#contacts'}>{TRANSLATIONS.Menu.contacts}</HashLink></li>
            </ul>
        </header>

        <main>
            <div id="landing">
                <h2>{TRANSLATIONS.Landing.title}</h2>
                <span>
                    {TRANSLATIONS.Landing.by}
                    <Link to={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>{TRANSLATIONS.Landing.author}</Link>
                </span>
                <h3>{TRANSLATIONS.Landing.subtitle}</h3>
            </div>

            <div id="servicos">
                <div>
                    <h2>
                        <Icon icon="palette" />
                        {TRANSLATIONS.Services.Design.title}
                    </h2>
                    <p>{TRANSLATIONS.Services.Design.hmtl}</p>
                </div>
                <div>
                    <h2>
                        <Icon icon="code" />
                        {TRANSLATIONS.Services.Development.title}
                    </h2>
                    <p>{TRANSLATIONS.Services.Development.html}</p>
                </div>
                <div>
                    <h2>
                        <Icon icon="wifi" />
                        {TRANSLATIONS.Services.Domains.title}
                    </h2>
                    <p>{TRANSLATIONS.Services.Domains.html}</p>
                </div>
                <div>
                    <h2>
                        <Icon icon="screwdriver-wrench" />
                        {TRANSLATIONS.Services.Management.title}
                    </h2>
                    <p>{TRANSLATIONS.Services.Management.html}</p>
                </div>
            </div>

            <div id="about">
                <p>{TRANSLATIONS.About.p1}</p>
                <p>{TRANSLATIONS.About.p1}</p>
                <div>
                    <img></img>
                    <div>
                        <p>{TRANSLATIONS.About.p1}</p>
                        <p>{TRANSLATIONS.About.p1}</p>
                        <div>
                            <Icon icon="linkedin" type='brands'/>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div id="contacts">
                <p>{TRANSLATIONS.Contacts.subtitle}</p>
                <Link to={`mailto:'divodedigitalservices'`}>
                    <h2>
                        {TRANSLATIONS.Contacts.title}    
                    </h2>
                </Link>
                <form>
                    <label>{TRANSLATIONS.Contacts.form.label1} {TRANSLATIONS.Contacts.form.mandatory}</label>
                    <input type='text'></input>
                    ...
                </form>
            </div>
        </main>

        <footer>
            <div>
                <HashLink smooth to={'./#landing'}>{TRANSLATIONS.Menu.home}</HashLink>
                <HashLink smooth to={'./#services'}>{TRANSLATIONS.Menu.services}</HashLink>
                <HashLink smooth to={'./#about'}>{TRANSLATIONS.Menu.about}</HashLink>
                <HashLink smooth to={'./#contact'}>{TRANSLATIONS.Menu.contacts}</HashLink>
                <p>{TRANSLATIONS.footer.copyright}</p>
            </div>
            <div>
                <img src='./divode_logo_white.png' alt='Divode logotipo em branco'></img>
                <p>{TRANSLATIONS.footer.subtitle}</p>
                <Link to={`mailto:'divodedigitalservices'`}>
                    <Icon icon="envelope" />
                    {TRANSLATIONS.footer.email}
                </Link>
                <Link to={'https://www.linkedin.com/in/dianafonte/'} target='_blank'>
                    <Icon icon="linkedin" type='brands'/>
                </Link>
            </div>
        </footer>
    </div>)
};

export default Homepage;