import React from 'react';
import { Link } from "react-router-dom"
import { TRANSLATIONS } from "../constants/translations"

const Homepage = () => {
    return (<div>
        <header className='d-flex justify-content-between align-items-center gap-3'>
            <Link to={'#landing'}>
                <img src={'./divode_logo.png'} alt="Divode logotipo em tons de azul" />
            </Link>
            <div className='d-none d-md-flex gap-3 align-items-center'>
                <Link to={'#services'}>{TRANSLATIONS.Menu.services}</Link>
                <Link to={'#about'}>{TRANSLATIONS.Menu.about}</Link>
                <Link to={'#contacts'}>{TRANSLATIONS.Menu.contacts}</Link>
            </div>
        </header>

        <main>
            <div id="landing">
                Serviços Digitais
            </div>

            <div id="servicos">
                Serviços
            </div>

            <div id="about">
                Sobre
            </div>

            <div id="contacts">
                Contactos
            </div>
        </main>

        <footer>
            Footer
        </footer>
    </div>)
};

export default Homepage;