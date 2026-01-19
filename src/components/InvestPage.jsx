import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const InvestPage = ({ section }) => {
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
            <h2 className="page-title">{t('invest.title')}</h2>
            <div className="info-page">
                <div id="why-invest" className="info-section">
                    <h3>{t('invest.whyInvest')}</h3>
                    <p className='content'>{t('invest.whyInvestContent')}</p>
                    <h2><i>{t('invest.keyHighlights')}</i></h2>
                    <ul>
                        <p className='tototo'><li>{t('invest.highlight1')}</li></p>
                        <p className='tototo'><li>{t('invest.highlight2')}</li></p>
                        <p className='tototo'><li>{t('invest.highlight3')}</li></p>
                        <p className='tototo'><li>{t('invest.highlight4')}</li></p>
                        <p className='tototo'><li>{t('invest.highlight5')}</li></p>
                    </ul>
                </div>
                
                <div id="how-to-help" className="info-section">
                    <h3>{t('invest.howToHelp')}</h3>
                    <p>{t('invest.howToHelpIntro')}</p>
                    <ul>
                        <p className='tototo'><li>{t('invest.help1')}</li></p>
                        <p className='tototo'><li>{t('invest.help2')}</li></p>
                        <p className='tototo'><li>{t('invest.help3')}</li></p>
                        <p className='tototo'><li>{t('invest.help4')}</li></p>
                        <p className='tototo'><li>{t('invest.help5')}</li></p>
                    </ul>
                    <p className='tototo'>{t('invest.helpOutro')}</p>
                </div>
                
                <div id="donate" className="info-section">
                    <h3>{t('invest.donate')}</h3>
                    <p>{t('invest.donateIntro')}</p>
                    <ul>
                        <p className='tototo'><li>{t('invest.donation1')}</li></p>
                        <p className='tototo'><li>{t('invest.donation2')}</li></p>
                        <p className='tototo'><li>{t('invest.donation3')}</li></p>
                        <p className='tototo'><li>{t('invest.donation4')}</li></p>
                        <p className='tototo'><li>{t('invest.donation5')}</li></p>
                    </ul>
                    <p className='tototo'>{t('invest.donateOutro')}</p>
                </div>
            </div>
        </div>
    );
};

export default InvestPage;