/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocationPopup from './LocationPopup';
import ProfilePopup from './ProfilePopup';
import CartPopup from './CartPopup';
import LikePopup from './LikePopup';

import LOCATION_ICON from "../assets/home/MAIN_MENU/LOCATION_BTN.png"
import PROFILE_BTN from "../assets/home/MAIN_MENU/PROFILE_BTN.png"
import CART_BTN from "../assets/home/MAIN_MENU/CART_BTN.png"
import LIKE_BTN from "../assets/home/MAIN_MENU/LIKE_BTN.png"

const MainNav = ({ cartItems, likeItems, onViewCart, onViewLikes }) => {
    const { t } = useTranslation();
    const [location, setLocation] = useState('');
    const [locationCoords, setLocationCoords] = useState(null);
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [showLikePopup, setShowLikePopup] = useState(false);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    
    const handleTrackLocation = (locationString, coords) => {
        setLocation(locationString);
        setLocationCoords(coords);
        setShowLocationPopup(false);
        
        // Optional: Store in localStorage for persistence
        localStorage.setItem('userLocation', locationString);
        if (coords) {
            localStorage.setItem('userLocationCoords', JSON.stringify(coords));
        }
        
        // Dispatch custom event to notify other components (like ProfilePage)
        window.dispatchEvent(new CustomEvent('locationUpdated', { detail: locationString }));
        
        // No alert needed - location is already shown in the UI
    };
    
    const handleSetLocation = (loc) => {
        if (loc.trim()) {
            setLocation(loc);
            setShowLocationPopup(false);
            
            // Store in localStorage
            localStorage.setItem('userLocation', loc);
            
            // Dispatch custom event to notify other components (like ProfilePage)
            window.dispatchEvent(new CustomEvent('locationUpdated', { detail: loc }));
        } else {
            // If empty string is passed, clear the location
            setLocation('');
            setLocationCoords(null);
            localStorage.removeItem('userLocation');
            localStorage.removeItem('userLocationCoords');
            
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('locationUpdated', { detail: '' }));
        }
    };
    
    // Load saved location on component mount
    React.useEffect(() => {
        const savedLocation = localStorage.getItem('userLocation');
        const savedCoords = localStorage.getItem('userLocationCoords');
        
        if (savedLocation) {
            setLocation(savedLocation);
        }
        if (savedCoords) {
            try {
                setLocationCoords(JSON.parse(savedCoords));
            } catch (e) {
                console.error('Failed to parse saved coordinates');
            }
        }
        
        // Listen for location changes from other components (like ProfilePage)
        const handleLocationUpdate = (e) => {
            const newLocation = e.detail;
            setLocation(newLocation || '');
            
            // If location is cleared, also clear coords
            if (!newLocation) {
                setLocationCoords(null);
            }
        };
        
        window.addEventListener('locationUpdated', handleLocationUpdate);
        
        return () => {
            window.removeEventListener('locationUpdated', handleLocationUpdate);
        };
    }, []);
    
    const handleSearch = () => {
        if (searchQuery.trim()) {
            window.location.hash = `#search?q=${encodeURIComponent(searchQuery)}`;
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    return (
        <nav className="main-nav">
            <div className="location-search">
                <div style={{position: 'relative'}}>
                    <div className="location-icon" onClick={() => setShowLocationPopup(!showLocationPopup)}>
                        <div className="location-icon"><img src={LOCATION_ICON} alt='location' className='location-img'/></div>
                        {location && <span style={{position: 'absolute', top: '-5px', right: '-5px', background: '#ffcc00', color: '#660066', borderRadius: '50%', width: '15px', height: '15px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</span>}
                    </div>
                    <LocationPopup 
                        show={showLocationPopup} 
                        onClose={() => setShowLocationPopup(false)}
                        location={location}
                        onTrackLocation={handleTrackLocation}
                        onSetLocation={handleSetLocation}
                    />
                </div>
                <div className="search-bar">
                    <select 
                        className="category-dropdown"
                        onChange={(e) => setSearchCategory(e.target.value)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            padding: '5px',
                            borderRight: '2px solid #eee',
                            marginRight: '10px'
                        }}
                    >
                        <option value="">{t('navigation.allCategories')}</option>
                        <option value="Rizz_master">{t('navigation.rizzMaster')}</option>
                        <option value="New">{t('navigation.new')}</option>
                        <option value="New2">{t('navigation.new2')}</option>
                        <option value="Aura_farmers">{t('navigation.auraFarmers')}</option>
                        <option value="Hot_picks">{t('navigation.hotPicks')}</option>
                        <option value="Casual">{t('navigation.casual')}</option>
                        <option value="Clocked">{t('navigation.clocked')}</option>
                    </select>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder={t('navigation.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{width: 'calc(100% - 120px)'}}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            
            <div className="nav-icons">
                <div style={{position: 'relative'}}>
                    <div className="nav-icon" onClick={() => setShowProfilePopup(!showProfilePopup)}>
                        <div className="profile-icon"><img src={PROFILE_BTN} alt='user' className='user'/></div>
                    </div>
                    <ProfilePopup 
                        show={showProfilePopup} 
                        onClose={() => setShowProfilePopup(false)}
                        user={user}
                        onLogin={() => setShowProfilePopup(false)}
                        onSignup={() => setShowProfilePopup(false)}
                    />
                </div>
                <div style={{position: 'relative'}}>
                    <div className="nav-icon" onClick={() => setShowCartPopup(!showCartPopup)}>
                        <div className="cart-icon"><img src={CART_BTN} alt='cart' className='cart'/></div>
                        {cartItems.length > 0 && <span style={{position: 'absolute', top: '-5px', right: '-5px', background: '#ff3366', color: 'white', borderRadius: '50%', width: '15px', height: '15px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{cartItems.length}</span>}
                    </div>
                    <CartPopup 
                        show={showCartPopup} 
                        onClose={() => setShowCartPopup(false)}
                        items={cartItems}
                        onViewCart={onViewCart}
                    />
                </div>
                <div style={{position: 'relative'}}>
                    <div className="nav-icon" onClick={() => setShowLikePopup(!showLikePopup)}>
                        <div className="like-icon"><img src={LIKE_BTN} alt='like' className='like'/></div>
                        {likeItems.length > 0 && <span style={{position: 'absolute', top: '-5px', right: '-5px', background: '#ff3366', color: 'white', borderRadius: '50%', width: '15px', height: '15px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{likeItems.length}</span>}
                    </div>
                    <LikePopup 
                        show={showLikePopup} 
                        onClose={() => setShowLikePopup(false)}
                        items={likeItems}
                        onViewLikes={onViewLikes}
                    />
                </div>
            </div>
        </nav>
    );
};

export default MainNav;