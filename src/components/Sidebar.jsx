import React from 'react';
import { useTranslation } from 'react-i18next';
import MAIN_SUB_HEADING_TEXT from "../assets/home/MAIN_LEFT/MAIN_SUB_HEADING_TEXT.png";
// Import all ad images
import advert1 from '../assets/ads/advert 1.png';
import advert2 from '../assets/ads/advert 2.png';
import advert3 from '../assets/ads/advert 3.png';
import advert4 from '../assets/ads/advert 4.png';
import advert5 from '../assets/ads/advert 5.png';
import advert6 from '../assets/ads/advert 6.png';
import advert7 from '../assets/ads/ADVERT 7.png';

const Sidebar = ({ onViewCategory }) => {
    const { t } = useTranslation();
    
    const scrollToTop = () => {
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const handleCategoryClick = (category) => {
        scrollToTop();
        onViewCategory(category);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-title check-sum">
                    <img src={MAIN_SUB_HEADING_TEXT} alt={t('sidebar.checkSum')} className='check-sum-img'/>
                </div>
                <div className="sidebar-title new-collection">{t('sidebar.newCollection')}</div>
                <div className="sidebar-subtitle new-1">{t('sidebar.newSubtitle1')}</div>
                <div 
                    className="sidebar-placeholder" 
                    style={{
                        backgroundImage: `url(${advert1})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #ff1493'
                    }}
                    onClick={() => handleCategoryClick('New')}
                ></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title new-collection-2">{t('sidebar.newCollection')}</div>
                <div className="sidebar-subtitle new-2">{t('sidebar.newSubtitle2')}</div>
                <div 
                    className="sidebar-placeholder" 
                    style={{
                        backgroundImage: `url(${advert2})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #0288d1'
                    }}
                    onClick={() => handleCategoryClick('New2')}
                ></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title aura-farmers">{t('sidebar.auraFarmers')}</div>
                <div className="sidebar-subtitle aura">{t('sidebar.auraSubtitle')}</div>
                <div 
                    className="sidebar-placeholder dotted-blue" 
                    style={{
                        backgroundImage: `url(${advert3})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #2e7d32'
                    }}
                    onClick={() => handleCategoryClick('Aura_farmers')}
                ></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title hot-picks">{t('sidebar.hotPicks')}</div>
                <div className="sidebar-subtitle hot">{t('sidebar.hotSubtitle')}</div>
                <div 
                    className="sidebar-placeholder dashed-gold" 
                    style={{
                        backgroundImage: `url(${advert4})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #f57c00'
                    }}
                    onClick={() => handleCategoryClick('Hot_picks')}
                ></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title casual">{t('sidebar.casual')}</div>
                <div className="sidebar-subtitle comfy">{t('sidebar.casualSubtitle')}</div>
                <div 
                    className="sidebar-placeholder" 
                    style={{
                        backgroundImage: `url(${advert5})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #c2185b'
                    }}
                    onClick={() => handleCategoryClick('Casual')}
                ></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title clocked">{t('sidebar.clocked')}</div>
                <div className="sidebar-subtitle clock">{t('sidebar.clockedSubtitle')}</div>
                <div 
                    className="sidebar-placeholder dashed-blue tall-placeholder" 
                    style={{
                        backgroundImage: `url(${advert6})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #7b1fa2'
                    }}
                    onClick={() => handleCategoryClick('Clocked')}
                ></div>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-title rizz">{t('sidebar.rizzMaster')}</div>
                <div className="sidebar-subtitle charm">{t('sidebar.rizzSubtitle')}</div>
                <div 
                    className="sidebar-placeholder tall-placeholder" 
                    style={{
                        backgroundImage: `url(${advert7})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '2px dashed #00796b'
                    }}
                    onClick={() => handleCategoryClick('Rizz_master')}
                ></div>
            </div>
        </aside>
    );
};

export default Sidebar;