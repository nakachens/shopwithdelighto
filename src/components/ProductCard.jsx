import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product, onViewProduct }) => {
    const { t } = useTranslation();
    
    return (
        <div className="product-card" onClick={() => onViewProduct(product)}>
            <img src={product.image} alt={t(product.name)} />
            <h4>{t(product.name)}</h4>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductCard;