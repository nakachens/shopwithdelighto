import React from 'react';
import { useTranslation } from 'react-i18next';
import CUTE_STAR from "../assets/home/FOOTER/CUTE_STAR.png"
import CUTE_STAR2 from "../assets/home/FOOTER/CUTE_STAR2.png"
import FOOTER_LOGO from "../assets/home/FOOTER/FOOTLOGO.png"

const Footer = () => {
    const { t } = useTranslation();
    
    return (
        <footer className="footer">
            <div className="footer-sections">
                <div className="footer-section">
                    <span className="footer-star"><img src={CUTE_STAR} alt='★' className='star-img-left'/></span>
                    <div className="footer-header">
                        <h3>{t('footer.about')}</h3>
                    </div>
                    <ul>
                        <li><a onClick={() => window.location = "#about/about-us"}>{t('about.aboutUs')}</a></li>
                        <li><a onClick={() => window.location = "#about/our-name"}>{t('about.ourName')}</a></li>
                        <li><a onClick={() => window.location = "#about/why-us"}>{t('about.whyUs')}</a></li>
                        <li><a onClick={() => window.location = "#about/features"}>{t('about.features')}</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <span className="footer-star"><img src={CUTE_STAR2} alt='★' className='star-img-right'/></span>
                    <div className="footer-header">
                        <h3>{t('footer.invest')}</h3>
                    </div>
                    <ul>
                        <li><a onClick={() => window.location = "#invest/why-invest"}>{t('invest.whyInvest')}</a></li>
                        <li><a onClick={() => window.location = "#invest/how-to-help"}>{t('invest.howToHelp')}</a></li>
                        <li><a onClick={() => window.location = "#invest/donate"}>{t('invest.donate')}</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <span className="footer-star"><img src={CUTE_STAR} alt='★' className='star-img-left'/></span>
                    <div className="footer-header">
                        <h3>{t('footer.payments')}</h3>
                    </div>
                    <ul>
                        <li><a onClick={() => window.location = "#payment/payment-methods"}>{t('payment.paymentMethods')}</a></li>
                        <li><a onClick={() => window.location = "#payment/security"}>{t('payment.security')}</a></li>
                        <li><a onClick={() => window.location = "#payment/faq"}>{t('contact.faq')}</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <span className="footer-star"><img src={CUTE_STAR2} alt='★' className='star-img-right'/></span>
                    <div className="footer-header"> 
                        <h3>{t('footer.socials')}</h3>
                    </div>
                    <ul>
                        <li><a onClick={() => window.location = "#contact/contact-info"}>{t('contact.contactInfo')}</a></li>
                        <li><a onClick={() => window.location = "#contact/departments"}>{t('contact.departments')}</a></li>
                        <li><a onClick={() => window.location = "#contact/contact-form"}>{t('contact.sendMessage')}</a></li>
                        <li><a onClick={() => window.location = "#contact/faq"}>{t('contact.faq')}</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-logo">
                    <div className="logo-footer"><img src={FOOTER_LOGO} alt="logo" className='footlogo'/></div>
                </div>
                <p className='foot-msg'>{t('footer.copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer;