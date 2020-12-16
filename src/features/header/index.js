import React from 'react';
import './styles/header-pc.scss';
import './styles/header-mobile.scss';
import logo from '../../assets/images/logo.svg';

const Header = () => (
    <header>
        <div className="logo">
            <img src={logo} alt=""/>
        </div>
        <h1>
            МИР УМНЫХ ТЕХНОЛОГИЙ
            <span>в вашем автомобиле</span>
        </h1>
        <h2>А скоро и на этом сайте!</h2>
    </header>
);

export default Header;