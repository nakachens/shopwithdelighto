import React from 'react';
import { useTranslation } from 'react-i18next';

const CartPage = ({ cartItems, onRemoveFromCart }) => {
    const { t } = useTranslation();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('cart.title')}</h2>
            {cartItems.length === 0 ? (
                <p>{t('cart.empty')}</p>
            ) : (
                <>
                    <div className="items-container">
                        {cartItems.map((item, index) => (
                            <div key={index} className="item-card">
                                <img src={item.image} alt={t(item.name)} />
                                <h4>{t(item.name)}</h4>
                                <p>${item.price}</p>
                                <button className="btn btn-secondary" onClick={() => onRemoveFromCart(index)}>
                                    {t('cart.remove')}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{marginTop: '20px', textAlign: 'center'}}>
                        <h3>{t('cart.total')}: ${total.toFixed(2)}</h3>
                        <button className="btn btn-primary" onClick={() => window.open('https://www.youtube.com/@qtvens', '_blank')}>
                            {t('cart.checkout')}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;