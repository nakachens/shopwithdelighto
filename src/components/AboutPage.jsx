import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = ({ section }) => {
    const { t } = useTranslation();
    
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
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('about.title')}</h2>
            <div className="info-page">
                <div id="about-us" className="info-section">
                    <h3>{t('about.aboutUs')}</h3>
                    <h2>{t('about.aboutUsContent0')}</h2>
                    <br></br>
                    <p className='content'>{t('about.aboutUsContent1')}</p>
                    <p className='content'>{t('about.aboutUsContent2')}</p>
                </div>
                
                <div id="our-name" className="info-section">
                    <h3>{t('about.ourName')}</h3>
                    <h2><b>{t('about.ourNameContent1')}</b></h2>
                    <br></br>
                    <p className='content'>{t('about.ourNameContent2')}</p>
                </div>
                
                <div id="why-us" className="info-section">
                    <h3>{t('about.whyUs')}</h3>
                    <h2>{t('about.whyUsTitle')}</h2>
                    <br></br>
                    <p className='content'>{t('about.feature1')}</p>
                    <br></br>
                    
                </div>
                
                <div id="features" className="info-section">
                    <h3>{t('about.features')}</h3>
                    <h2>{t('about.featuresTitle')}</h2>
                    <br></br>
                        <p className='content'>{t('about.platformFeature1')}</p>
                        <p className='content'>{t('about.platformFeature2')}</p>
                        <p className='content'>{t('about.platformFeature3')}</p>
                </div>

                <div id="conclusion" className="info-section">
                    <h3>{t('about.con')}</h3>
                    <h2>{t('about.conTitle')}</h2>
                    <br></br>
                    <p className='content'>{t('about.con1')}</p>
                    <br></br>
                    
                </div>
            </div>
        </div>
    );
};

export default AboutPage;