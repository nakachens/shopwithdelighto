import React from 'react';
import { useTranslation } from 'react-i18next';
import MAIN_SUB_HEADING_TEXT from "../assets/home/MAIN_LEFT/MAIN_SUB_HEADING_TEXT.png";

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
                <div className="sidebar-placeholder" onClick={() => handleCategoryClick('New')}></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title new-collection-2">{t('sidebar.newCollection')}</div>
                <div className="sidebar-subtitle new-2">{t('sidebar.newSubtitle2')}</div>
                <div className="sidebar-placeholder" onClick={() => handleCategoryClick('New2')}></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title aura-farmers">{t('sidebar.auraFarmers')}</div>
                <div className="sidebar-subtitle aura">{t('sidebar.auraSubtitle')}</div>
                <div className="sidebar-placeholder dotted-blue" onClick={() => handleCategoryClick('Aura_farmers')}></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title hot-picks">{t('sidebar.hotPicks')}</div>
                <div className="sidebar-subtitle hot">{t('sidebar.hotSubtitle')}</div>
                <div className="sidebar-placeholder dashed-gold" onClick={() => handleCategoryClick('Hot_picks')}></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title casual">{t('sidebar.casual')}</div>
                <div className="sidebar-subtitle comfy">{t('sidebar.casualSubtitle')}</div>
                <div className="sidebar-placeholder" onClick={() => handleCategoryClick('Casual')}></div>
            </div>
            
            <div className="sidebar-section">
                <div className="sidebar-title clocked">{t('sidebar.clocked')}</div>
                <div className="sidebar-subtitle clock">{t('sidebar.clockedSubtitle')}</div>
                <div className="sidebar-placeholder dashed-blue tall-placeholder" onClick={() => handleCategoryClick('Clocked')}></div>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-title rizz">{t('sidebar.rizzMaster')}</div>
                <div className="sidebar-subtitle charm">{t('sidebar.rizzSubtitle')}</div>
                <div className="sidebar-placeholder tall-placeholder" onClick={() => handleCategoryClick('Rizz_master')}></div>
            </div>
        </aside>
    );
};

export default Sidebar;