import React from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const CategoryPage = ({ category, onViewProduct }) => {
    const { t } = useTranslation();
    const categoryProducts = products.filter(p => 
        category === 'all' ? true : p.category === category
    );

    const scrollToProduct = () => {
        window.scrollTo({ top: 250, behavior: 'smooth' });
    };

    const handleProductClick = (product) => {
        scrollToProduct();
        onViewProduct(product);
    };

    // Get category title and subtitle from translations
    const getCategoryTitle = () => {
        try {
            return t(`category.${category}.title`);
        } catch {
            return `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
        }
    };

    const getCategorySubtitle = () => {
        try {
            return t(`category.${category}.subtitle`);
        } catch {
            return 'Explore our selection';
        }
    };
    
    return (
        <div className="main-content">
            <div className="category-header">
                <h2 className="page-title">{getCategoryTitle()}</h2>
                <p className="category-subtitle">{getCategorySubtitle()}</p>
            </div>
            <div className="items-container">
                {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} onViewProduct={handleProductClick} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;