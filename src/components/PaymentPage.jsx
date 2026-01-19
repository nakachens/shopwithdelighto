import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PaymentPage = ({ section }) => {
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
            <h2 className="page-title">{t('payment.title')}</h2>
            <div className="info-page">
                <div id="payment-methods" className="info-section">
                    <h3>{t('payment.paymentMethods')}</h3>
                    <p>{t('payment.paymentMethodsIntro')}</p>
                    <div className="payment-methods" style={{display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', margin: '20px 0'}}>
                        <div className="payment-method" style={{background: '#f8f8f8', border: '2px solid #ffbe62ff', borderRadius: '8px', padding: '15px', width: '150px', textAlign: 'center'}}>
                            <i className="fas fa-credit-card" style={{fontSize: '2rem', marginBottom: '10px', color: '#492304ff'}}></i>
                            <h4>{t('payment.creditCards')}</h4>
                        </div>
                        <div className="payment-method" style={{background: '#f8f8f8', border: '2px solid #ffbe62ff', borderRadius: '8px', padding: '15px', width: '150px', textAlign: 'center'}}>
                            <i className="fab fa-paypal" style={{fontSize: '2rem', marginBottom: '10px', color: '#492304ff'}}></i>
                            <h4>{t('payment.paypal')}</h4>
                        </div>
                        <div className="payment-method" style={{background: '#f8f8f8', border: '2px solid #ffbe62ff', borderRadius: '8px', padding: '15px', width: '150px', textAlign: 'center'}}>
                            <i className="fas fa-mobile-alt" style={{fontSize: '2rem', marginBottom: '10px', color: '#492304ff'}}></i>
                            <h4>{t('payment.mobilePay')}</h4>
                        </div>
                        <div className="payment-method" style={{background: '#f8f8f8', border: '2px solid #ffbe62ff', borderRadius: '8px', padding: '15px', width: '150px', textAlign: 'center'}}>
                            <i className="fas fa-university" style={{fontSize: '2rem', marginBottom: '10px', color: '#492304ff'}}></i>
                            <h4>{t('payment.bankTransfer')}</h4>
                        </div>
                        <div className="payment-method" style={{background: '#f8f8f8', border: '2px solid #ffbe62ff', borderRadius: '8px', padding: '15px', width: '150px', textAlign: 'center'}}>
                            <i className="fas fa-money-bill-wave" style={{fontSize: '2rem', marginBottom: '10px', color: '#492304ff'}}></i>
                            <h4>{t('payment.cashOnDelivery')}</h4>
                        </div>
                    </div>
                </div>
                
                <div id="security" className="info-section">
                    <h3>{t('payment.security')}</h3>
                    <p>{t('payment.securityIntro')}</p>
                    <ul>
                        <p className='tototo'><li>{t('payment.securityFeature1')}</li></p>
                        <p className='tototo'><li>{t('payment.securityFeature2')}</li></p>
                        <p className='tototo'><li>{t('payment.securityFeature3')}</li></p>
                        <p className='tototo'><li>{t('payment.securityFeature4')}</li></p>
                        <p className='tototo'><li>{t('payment.securityFeature5')}</li></p>
                    </ul>
                    <p className='tototo'>{t('payment.securityOutro')}</p>
                </div>
                
                <div id="faq" className="info-section">
                    <h3>{t('payment.faq')}</h3>
                    <p><strong>{t('payment.faqQ1')}</strong><br /></p>
                    <p className='answer'>{t('payment.faqA1')}</p>
                    
                    <p className='question'><strong>{t('payment.faqQ2')}</strong><br /></p>
                    <p className='answer'>{t('payment.faqA2')}</p>
                    
                    <p className='question'><strong>{t('payment.faqQ3')}</strong><br /></p>
                    <p className='answer'>{t('payment.faqA3')}</p>
                    
                    <p className='question'><strong>{t('payment.faqQ4')}</strong><br /></p>
                    <p className='answer'>{t('payment.faqA4')}</p>
                    
                    <p className='question'><strong>{t('payment.faqQ5')}</strong><br /></p>
                    <p className='answer'>{t('payment.faqA5')}</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;