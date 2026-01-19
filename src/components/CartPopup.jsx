import React from 'react';
import { useTranslation } from 'react-i18next';

const CartPopup = ({ show, onClose, items, onViewCart }) => {
    const { t } = useTranslation();
    
    if (!show) return null;
    
    return (
        <div className="popup cart-popup">
            <h3>{t('cart.shoppingCart')}</h3>
            {items.length === 0 ? (
                <p>{t('cart.empty')}</p>
            ) : (
                <>
                    {items.map((item, index) => (
                        <div key={index} style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0', padding: '5px', background: '#f0f0f0'}}>
                            <span>{t(item.name)}</span>
                            <span>${item.price}</span>
                        </div>
                    ))}
                    <button className="btn btn-primary" style={{width: '100%'}} onClick={onViewCart}>
                        {t('cart.viewCart')}
                    </button>
                </>
            )}
            <button onClick={onClose} style={{marginTop: '10px', background: '#ccc', width: '100%'}}>
                {t('cart.close')}
            </button>
        </div>
    );
};

export default CartPopup;