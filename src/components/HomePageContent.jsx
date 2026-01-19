import React from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import SUBHEADING_LOW from "../assets/home/MAIN_BODY/SUBHEADING_LOW.png"
import SUBHEADING_LOW_2 from "../assets/home/MAIN_BODY/SUBHEADING_LOW_2.png"
import DIVISION_1 from "../assets/home/MAIN_BODY/DIVISION_1.png"
import DIVISION_2 from "../assets/home/MAIN_BODY/DIVISION_2.png"
import Dont from "../assets/home/MAIN_SUB/dont.png"

const HomePageContent = ({ onViewProduct, onViewCategory }) => {
    const { t } = useTranslation();
    
    const scrollToTop = () => {
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const scrollToProduct = () => {
        window.scrollTo({ top: 250, behavior: 'smooth' });
    };

    const handleCategoryClick = (category) => {
        scrollToTop();
        onViewCategory(category);
    };

    const handleAllProductsClick = () => {
        scrollToTop();
        window.location.hash = "#category/all";
    };

    const handleProductClick = (product) => {
        scrollToProduct();
        onViewProduct(product);
    };

    return (
        <div className="main-content">
            <div className="content-section">
                <div className="title">{t('home.newUpdate')}</div>
                <div className='subtitle'>{t('home.nocturaSubtitle')}</div>
                <div className="image-placeholder" onClick={() => handleCategoryClick('New')}></div>
                <p className="text">
                    <span className='gothic-text'>{t('home.nocturaName')} </span>{t('home.nocturaDescription')}
                </p>
                <div className="full-on-fantasy">
                    <img src={SUBHEADING_LOW} alt={t('home.fullOnFantasy')} className='full-on-fantasy-img'></img>
                </div>
                <div className="mamacita-divider">
                    <img src={DIVISION_1} alt='divider' className='mamacita-divider-img'/>
                </div>
            </div>
            <div className="content-section">
                <div className="subtitle">
                    {t('home.wingsSubtitle')}
                </div>
                <div className="image-placeholder" onClick={() => handleCategoryClick('New2')}></div>
                <p className="text-2">
                    <span className='gothic-text'>{t('home.wingsName')} </span>{t('home.wingsDescription')}
                </p>
                <div className="more-than-dream">
                    <img src={SUBHEADING_LOW_2} alt={t('home.moreThanDream')} className='more-than-dream-img'/>
                </div>
            </div>
            <div className="thats-not-divider">
                    <img src={DIVISION_2} alt='divider' className='thats-not-img'/>
                </div>
                <div className="dont">
                    <img src={Dont} alt={t('home.dontMissOut')} className='dont-img'/>
                </div>
                <h2 className='never'>{t('home.neverEnding')}</h2>
            <div className="content-section cream-section">
                <p className="text-3">
                    {t('home.collectionDescription')}
                </p>
                <div className="product-grid">
                    {products.slice(0, 3).map(product => (
                        <div key={product.id} className="product-placeholder" onClick={() => handleProductClick(product)} style={{position: 'relative', overflow: 'hidden'}}>
                            <img src={product.image} alt={t(product.name)} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                            <div style={{position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', padding: '5px 15px', borderRadius: '5px', fontWeight: 'bold', color: '#333', zIndex: '10'}}>
                                ${product.price}
                            </div>
                        </div>
                    ))}
                </div>
                
                <button className="button" onClick={handleAllProductsClick}>{t('home.allProducts')}</button>
            </div>
            <div className="advert-placeholder" onClick={() => handleCategoryClick('New2')}></div>
        </div>
    );
};

export default HomePageContent;