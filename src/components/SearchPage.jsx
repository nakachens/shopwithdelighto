import React from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const SearchPage = ({ query, category, onViewProduct }) => {
    const { t } = useTranslation();
    let filteredProducts = products;
    
    if (query) {
        filteredProducts = filteredProducts.filter(product => 
            t(product.name).toLowerCase().includes(query.toLowerCase()) ||
            t(product.description).toLowerCase().includes(query.toLowerCase())
        );
    }
    
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('search.title')}</h2>
            <div className="info-section">
                {query && <p>{t('search.searchTerm')}: "{query}"</p>}
                {category && category !== 'all' && <p>{t('search.category')}: {category}</p>}
                <p>{t('search.found', { count: filteredProducts.length })}</p>
            </div>
            
            {filteredProducts.length > 0 ? (
                <div className="items-container">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} />
                    ))}
                </div>
            ) : (
                <p>{t('search.noResults')}</p>
            )}
        </div>
    );
};

export default SearchPage;