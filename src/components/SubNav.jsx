import React from 'react';
import { useTranslation } from 'react-i18next';
import star from "../assets/home/MAIN_SUB/star.png"

const SubNav = () => {
    const { t } = useTranslation();
    
    const handleLogoClick = () => {
        window.location.hash = "#home";
    };
    
    return (
        <nav className="sub-nav">
            <i className="star" style={{left: '10%'}}></i>
            <img src={star} alt="star" className='star'/>
            <div className="sub-nav-tab" onClick={handleLogoClick}>{t('navigation.home')}</div>
            <img src={star} alt="star" className='star'/>
            <div className="sub-nav-tab" onClick={() => window.location.hash = "#about"}>{t('navigation.about')}</div>
            <img src={star} alt="star" className='star'/>
            <div className="sub-nav-tab" onClick={() => window.location.hash = "#invest"}>{t('navigation.invest')}</div>
            <img src={star} alt="star" className='star'/>
            <div className="sub-nav-tab" onClick={() => window.location.hash = "#payment"}>{t('navigation.payments')}</div>
            <img src={star} alt="star" className='star'/>
            <div className="sub-nav-tab" onClick={() => window.location.hash = "#contact"}>{t('navigation.contact')}</div>
            <i className="star" style={{right: '10%'}}></i>
        </nav>
    );
};

export default SubNav;