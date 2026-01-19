import React from 'react';
import { useTranslation } from 'react-i18next';

const LikesPage = ({ likeItems, onRemoveFromLikes, onAddToCart }) => {
    const { t } = useTranslation();
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('likes.title')}</h2>
            {likeItems.length === 0 ? (
                <p>{t('likes.empty')}</p>
            ) : (
                <div className="items-container">
                    {likeItems.map((item, index) => (
                        <div key={index} className="item-card">
                            <img src={item.image} alt={t(item.name)} />
                            <h4>{t(item.name)}</h4>
                            <p>${item.price}</p>
                            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                <button className="btn btn-primary" onClick={() => onAddToCart(item)}>
                                    {t('likes.addToCart')}
                                </button>
                                <button className="btn btn-secondary" onClick={() => onRemoveFromLikes(index)}>
                                    {t('likes.remove')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LikesPage;