import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import IG_BTN from "../assets/contacts/IG_BTN.png";
import YT_BTN from "../assets/contacts/YT_BTN.png";
import LN_BTN from "../assets/contacts/LN_BTN.png";
import MAIL_BTN from "../assets/contacts/MAIL_BTN.png";
import GH_BTN from "../assets/contacts/GH_BTN.png";

const ContactPage = ({ section }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [department, setDepartment] = useState('general');
    
    useEffect(() => {
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                const elementTop = element.offsetTop;
                window.scrollTo({ 
                    top: elementTop - 100,
                    behavior: 'smooth' 
                });
            }
        }
    }, [section]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t('contact.thankYou', { name }));
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setDepartment('general');
    };
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('contact.title')}</h2>
            <div className="info-page">
                <div id="contact-info" className="info-section">
                    <h3>{t('contact.contactInfo')}</h3>
                    <h4>{t('contact.contactInfoSubtitle')}</h4>
                    <ul>
                        <p className='tototo'><li><strong>{t('contact.address')}:</strong> {t('contact.addressValue')}</li></p>
                        <p className='tototo'><li><strong>{t('contact.phone')}:</strong> {t('contact.phoneValue')}</li></p>
                        <li>
                            <nav className='icons-nav'>
                                <a href="https://www.youtube.com/@qtvens" target='_blank' rel="noreferrer">
                                    <img src={YT_BTN} className='icons' alt='youtube'/>
                                </a>
                                <a href="https://www.instagram.com/zwochens/" target='_blank' rel="noreferrer">
                                    <img src={IG_BTN} className='icons' alt='instagram'/>
                                </a>
                                <a href="https://www.linkedin.com/in/zoha-kashif-a22961363" target='_blank' rel="noreferrer">
                                    <img src={LN_BTN} className='icons' alt='linkedin'/>
                                </a>
                                <a href="https://github.com/nakachens" target='_blank' rel="noreferrer">
                                    <img src={GH_BTN} className='icons' alt='github'/>
                                </a>
                                <a href="https://i.pinimg.com/1200x/55/a7/39/55a739ef587cda456949d0af7a84987d.jpg" target='_blank' rel="noreferrer">
                                    <img src={MAIL_BTN} className='icons' alt='email'/>
                                </a>
                            </nav>
                        </li>
                    </ul>
                    <p>{t('contact.fasterResponse')}</p>
                </div>
                
                <div id="departments" className="info-section">
                    <h3>{t('contact.departments')}</h3>
                    <p><strong>{t('contact.customerSupport')}</strong></p>
                    <p className='twotwo'><strong>{t('contact.technicalSupport')}</strong></p>
                    <p className='twotwo'><strong>{t('contact.partnerships')}</strong></p>
                    <p className='twotwo'><strong>{t('contact.investorRelations')}</strong></p>
                    <p className='twotwo'><strong>{t('contact.justMessage')}</strong></p>
                </div>
                
                <div id="contact-form" className="info-section">
                    <h3>{t('contact.sendMessage')}</h3>
                    <form className="contact-form" onSubmit={handleSubmit} style={{background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #ffa963ff', maxWidth: '600px', margin: '0 auto'}}>
                        <div className="form-group">
                            <label>{t('contact.nameLabel')}</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t('contact.namePlaceholder')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('contact.emailLabel')}</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('contact.emailPlaceholder')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('contact.departmentLabel')}</label>
                            <select 
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="general">{t('contact.generalInquiry')}</option>
                                <option value="support">{t('contact.support')}</option>
                                <option value="technical">{t('contact.technical')}</option>
                                <option value="partnership">{t('contact.partnership')}</option>
                                <option value="investor">{t('contact.investor')}</option>
                                <option value="press">{t('contact.press')}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t('contact.subjectLabel')}</label>
                            <input 
                                type="text" 
                                value={subject} 
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder={t('contact.subjectPlaceholder')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('contact.messageLabel')}</label>
                            <textarea 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('contact.messagePlaceholder')}
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="btn btn-primary">
                                {t('contact.sendButton')}
                            </button>
                            <button type="reset" className="btn btn-secondary">
                                {t('contact.clearForm')}
                            </button>
                        </div>
                    </form>
                </div>
                
                <div id="faq" className="info-section">
                    <h3>{t('contact.faq')}</h3>
                    <p><strong>{t('contact.faqQ1')}</strong><br /></p>
                    <p className='answer'>{t('contact.faqA1')}</p>
                    
                    <p className='question'><strong>{t('contact.faqQ2')}</strong><br /></p>
                    <p className='answer'>{t('contact.faqA2')}</p>
                    
                    <p className='question'><strong>{t('contact.faqQ3')}</strong><br /></p>
                    <p className='answer'>{t('contact.faqA3')}</p>
                    
                    <p className='question'><strong>{t('contact.faqQ4')}</strong><br /></p>
                    <p className='answer'>{t('contact.faqA4')}</p>
                    
                    <p className='question'><strong>{t('contact.faqQ5')}</strong><br /></p>
                    <p className='answer'>{t('contact.faqA5')}</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;