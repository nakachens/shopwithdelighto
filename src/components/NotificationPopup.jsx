import React, { useEffect } from 'react';
import cartImg from '../assets/cart_icon.png'
import likeImg from '../assets/like_icon.png';

const NotificationPopup = ({ show, onClose, message, type = 'success', t, title }) => {
    
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 10000);
            
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);
    
    if (!show) return null;
    
    const icon = type === 'cart' ? <img src={cartImg} alt="cart" width={80} height={80}/> : <img src={likeImg} alt="like" width={80} height={80}/>;
    
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
                background: '#feeccaff',
                borderRadius: '15px',
                padding: '30px 40px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center',
                animation: 'slideDown 0.3s ease-out',
                border: '5px solid #FFB700'
            }}>
                <div style={{
                    fontSize: '48px',
                    marginBottom: '15px',
                    animation: 'bounce 0.6s ease-in-out'
                }}>
                    {icon}
                </div>
                <h3 style={{
                    color: '#000000ff',
                    margin: '0 0 10px 0',
                    fontSize: '24px',
                    fontWeight: 'bolder',
                }}>
                    {title || (type === 'cart' ? t('alerts.success') : t('alerts.liked'))}
                </h3>
                <p style={{
                    color: 'black',
                    margin: '0 0 20px 0',
                    fontSize: '16px',
                    lineHeight: '1.5'
                }}>
                    {message}
                </p>
                <button 
                    onClick={onClose}
                    style={{
                        background: '#FFB700',
                        color: '#000000ff',
                        border: 'none',
                        padding: '12px 30px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 10px rgba(255, 204, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#f3a702ff';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = '#ffcc00';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    {t('common.close')}
                </button>
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
                    50% { transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
};

export default NotificationPopup;