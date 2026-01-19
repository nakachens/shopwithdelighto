import React from 'react';
import { useTranslation } from 'react-i18next';

const LikePopup = ({ show, onClose, items, onViewLikes }) => {
    const { t } = useTranslation();
    
    if (!show) return null;
    
    return (
        <div className="popup like-popup">
            <h3>{t('likes.likedItems')}</h3>
            {items.length === 0 ? (
                <p>{t('likes.empty')}</p>
            ) : (
                <>
                    {items.map((item, index) => (
                        <div key={index} style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0', padding: '5px', background: '#f0f0f0'}}>
                            <span>{t(item.name)}</span>
                            <button className="btn btn-secondary" style={{padding: '2px 5px'}}>
                                {t('likes.addToCart')}
                            </button>
                        </div>
                    ))}
                    <button className="btn btn-primary" style={{width: '100%'}} onClick={onViewLikes}>
                        {t('likes.viewAllLikes')}
                    </button>
                </>
            )}
            <button onClick={onClose} style={{marginTop: '10px', background: '#ccc', width: '100%'}}>
                {t('common.close')}
            </button>
        </div>
    );
};

export default LikePopup;