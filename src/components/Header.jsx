import React from 'react';
import { useTranslation } from 'react-i18next';
import LOGO_MAIN from "../assets/home/HEADER/LOGO_MAIN.png";

const Header = () => {
    const { t } = useTranslation();
    
    const handleLogoClick = () => {
        window.location.hash = "#home";
    };

    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick}>
                <img 
                    src={LOGO_MAIN}
                    alt={t('header.logoAlt')} 
                />
            </div>
        </header>
    );
};

export default Header;