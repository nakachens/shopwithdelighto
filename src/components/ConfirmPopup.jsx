import React from 'react';
import { useTranslation } from 'react-i18next';
import logoutImg from '../assets/logout_icon.png';

const ConfirmPopup = ({ show, onClose, onConfirm, message, title, confirmText, cancelText, type = 'warning' }) => {
    const { t } = useTranslation();
    
    if (!show) return null;
    
    const icon = type === 'warning' ? <img src={logoutImg} alt="cart" width={60} height={60}/> : type === 'danger' ? <img src={logoutImg} alt="cart" width={60} height={60}/> : 'ℹ️';
    const gradientColor = type === 'danger' ? 'linear-gradient(135deg, #c62828 0%, #d32f2f 100%)' : 
                           type === 'warning' ? 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)' :
                           'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)';
    
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };
    
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease-in'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px 40px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center',
                animation: 'slideDown 0.3s ease-out',
                border: '3px solid #ffcc00'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: gradientColor,
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    animation: 'bounce 0.6s ease-in-out'
                }}>
                    {icon}
                </div>
                
                <h3 style={{
                    color: '#ff8263ff',
                    margin: '0 0 15px 0',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    {title}
                </h3>
                
                <p style={{
                    color: '#666',
                    margin: '0 0 25px 0',
                    fontSize: '16px',
                    lineHeight: '1.5'
                }}>
                    {message}
                </p>
                
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center'
                }}>
                    <button 
                        onClick={handleConfirm}
                        style={{
                            background: type === 'danger' ? '#dc3545' : '#660066',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        {confirmText}
                    </button>
                    
                    <button 
                        onClick={onClose}
                        style={{
                            background: '#e0e0e0',
                            color: '#333',
                            border: 'none',
                            padding: '12px 30px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#d0d0d0';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = '#e0e0e0';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        {cancelText || t('alerts.cancel')}
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideDown {
                    from {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
};

export default ConfirmPopup;