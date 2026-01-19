import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentUser, logoutUser } from '../utils/auth';
import ConfirmPopup from './ConfirmPopup';

const ProfilePopup = ({ show, onClose }) => {
    const { t, i18n } = useTranslation();
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, [show]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setShowLanguageSelector(false);
    };

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        setShowLogoutConfirm(false);
        onClose();
        window.location = "#home";
    };

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'ur', name: 'اردو', flag: '🇵🇰' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    ];

    if (!show) return null;

    return (
        <>
            <div className="popup profile-popup">
                {user ? (
                    <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid #ff6699',
                                marginBottom: '10px',
                                backgroundColor: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {user.profilePicture ? (
                                    <img 
                                        src={user.profilePicture} 
                                        alt="Profile" 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        fontSize: '36px',
                                        color: '#ff6699',
                                        fontWeight: 'bold'
                                    }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <h3 style={{ margin: '5px 0', color: '#660066' }}>
                                {user.name}
                            </h3>
                            <p style={{ 
                                margin: '0', 
                                fontSize: '13px',
                                color: '#666'
                            }}>
                                {user.email}
                            </p>
                            {user.bio && (
                                <p style={{
                                    margin: '10px 0 0 0',
                                    fontSize: '12px',
                                    color: '#888',
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    padding: '0 10px'
                                }}>
                                    "{user.bio}"
                                </p>
                            )}
                        </div>
                        
                        <button 
                            className="btn btn-primary" 
                            style={{width: '100%', margin: '5px 0'}} 
                            onClick={() => {
                                onClose();
                                window.location.hash = "#profile";
                            }}
                        >
                            {t('profile.viewProfile')}
                        </button>
                        
                        <button 
                            className="btn btn-secondary" 
                            style={{
                                width: '100%', 
                                margin: '5px 0',
                                backgroundColor: '#dc3545',
                                borderColor: '#dc3545'
                            }} 
                            onClick={() => setShowLogoutConfirm(true)}
                        >
                            {t('profile.logout')}
                        </button>
                    </>
                ) : (
                    <>
                        <h3>{t('profile.profile')}</h3>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                onClose();
                                window.location.hash = "#login";
                            }} 
                            style={{width: '100%', margin: '5px 0'}}
                        >
                            {t('profile.login')}
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => {
                                onClose();
                                window.location.hash = "#signup";
                            }} 
                            style={{width: '100%', margin: '5px 0'}}
                        >
                            {t('profile.signup')}
                        </button>
                    </>
                )}
                
                <button 
                    className="btn btn-secondary" 
                    style={{width: '100%', margin: '5px 0'}} 
                    onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                >
                    {t('profile.language')}
                </button>
                
                {showLanguageSelector && (
                    <div style={{
                        marginTop: '15px', 
                        padding: '15px', 
                        border: '2px solid #ff6699', 
                        borderRadius: '8px', 
                        backgroundColor: '#fef9e7'
                    }}>
                        <h4 style={{
                            marginBottom: '10px', 
                            fontSize: '14px', 
                            color: '#660066', 
                            textAlign: 'center'
                        }}>
                            {t('profile.chooseLanguage')}
                        </h4>
                        
                        <select
                            value={i18n.language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #ff3366',
                                borderBottom: '5px solid #ff3366',
                                borderRadius: '5px',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#660066',
                                outline: 'none',
                                transition: 'all 0.2s',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff3366' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 10px center',
                                backgroundSize: '20px',
                                paddingRight: '40px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#ffebf0';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            {languages.map(lang => (
                                <option 
                                    key={lang.code} 
                                    value={lang.code}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: 'white',
                                        color: '#660066'
                                    }}
                                >
                                    {lang.flag} {lang.name}
                                </option>
                            ))}
                        </select>
                        
                        <button 
                            className="btn btn-secondary" 
                            style={{width: '100%', marginTop: '10px', fontSize: '12px'}}
                            onClick={() => setShowLanguageSelector(false)}
                        >
                            {t('common.close')}
                        </button>
                    </div>
                )}
                
                <button 
                    onClick={onClose} 
                    style={{marginTop: '10px', background: '#ccc', width: '100%'}}
                >
                    {t('common.close')}
                </button>
            </div>
            
            <ConfirmPopup 
                show={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
                title={t('alerts.logoutTitle')}
                message={t('profile.logoutConfirm')}
                confirmText={t('profile.logout')}
                cancelText={t('alerts.cancel')}
                type="danger"
            />
        </>
    );
};

export default ProfilePopup;