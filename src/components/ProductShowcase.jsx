import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductShowcase = ({ product, onAddToCart, onAddToLike }) => {
    const { t } = useTranslation();
    
    if (!product) return <div>{t('product.notFound')}</div>;
    
    const handleAllProductsClick = () => {
        window.location.hash = "#category/all";
    };
    
    return (
        <div className="main-content">
            <button className="back-btn" onClick={handleAllProductsClick}>{t('product.back')}</button>
            <h2 className="page-title">{t('product.itemDetails')}</h2>
            
            <div className="product-page">
                <div className="product-showcase">
                    <img src={product.image} alt={t(product.name)} />
                    <h2>{t(product.name)}</h2>
                    <p className="price">${product.price}</p>
                    <div className="speech-bubble">
                        {t(product.description)}
                    </div>
                    <div className="product-buttons">
                        <button className="add-to-cart" onClick={() => onAddToCart(product)}>
                            <i className="fas fa-shopping-cart"></i> {t('product.addToCart')}
                        </button>
                        <button className="add-to-like" onClick={() => onAddToLike(product)}>
                            <i className="fas fa-heart"></i> {t('product.like')}
                        </button>
                        <button className="buy-now" onClick={() => window.open('https://www.youtube.com/', '_blank')}>
                            {t('product.buyNow')}
                        </button>
                    </div>
                </div>
            </div>
            <div className='details-section'>
                <h1 className='details_heading'>{t(product.heading_details)}</h1>
                <p className='details'>{t(product.details)}</p>
            </div>
            <div className='details-section'>
                <h1 className='details_heading'>{t('product.theOrigin')}</h1>
                <p className='details'>{t(product.origin)}</p>
            </div>
        </div>
    );
};

export default ProductShowcase;