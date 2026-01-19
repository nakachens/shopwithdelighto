/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentUser, updateUserProfile, logoutUser } from '../utils/auth';
import ConfirmPopup from './ConfirmPopup';

const ProfilePage = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedBio, setEditedBio] = useState('');
    const [editedProfilePicture, setEditedProfilePicture] = useState('');
    const [location, setLocation] = useState('');
    const [inputLocation, setInputLocation] = useState('');
    const [isTrackingLocation, setIsTrackingLocation] = useState(false);
    const [locationDebug, setLocationDebug] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    
    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location = "#login";
        } else {
            setUser(currentUser);
            setEditedName(currentUser.name);
            setEditedBio(currentUser.bio || '');
            setEditedProfilePicture(currentUser.profilePicture || '');
            
            // Load saved location
            const savedLocation = localStorage.getItem('userLocation');
            if (savedLocation) {
                setLocation(savedLocation);
            }
        }
        
        // Listen for location changes from other components
        const handleStorageChange = (e) => {
            if (e.key === 'userLocation') {
                setLocation(e.newValue || '');
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Also listen for custom event for same-tab updates
        const handleLocationUpdate = (e) => {
            setLocation(e.detail || '');
        };
        
        window.addEventListener('locationUpdated', handleLocationUpdate);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('locationUpdated', handleLocationUpdate);
        };
    }, []);
    
    const handleLogout = () => {
        logoutUser();
        window.location = "#home";
    };
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveProfile = () => {
        const result = updateUserProfile(user.id, {
            name: editedName,
            bio: editedBio,
            profilePicture: editedProfilePicture
        });
        
        if (result.success) {
            setUser(result.user);
            setIsEditing(false);
        }
    };
    
    const handleCancelEdit = () => {
        setEditedName(user.name);
        setEditedBio(user.bio || '');
        setEditedProfilePicture(user.profilePicture || '');
        setIsEditing(false);
    };
    
    // Location tracking function
    const getLocationName = async (latitude, longitude) => {
        const services = [
            {
                name: 'BigDataCloud',
                url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
                parser: (data) => {
                    const city = data.city || data.locality || data.principalSubdivision;
                    const state = data.principalSubdivision;
                    const country = data.countryName;
                    
                    if (city && country) {
                        return state && state !== city ? `${city}, ${state}, ${country}` : `${city}, ${country}`;
                    }
                    return null;
                }
            },
            {
                name: 'Nominatim',
                url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                parser: (data) => {
                    const address = data.address || {};
                    const city = address.city || address.town || address.village || address.county;
                    const state = address.state;
                    const country = address.country;
                    
                    if (city) {
                        let loc = city;
                        if (state && state !== city) loc += `, ${state}`;
                        if (country) loc += `, ${country}`;
                        return loc;
                    }
                    return null;
                }
            }
        ];
        
        for (const service of services) {
            try {
                const response = await fetch(service.url);
                if (response.ok) {
                    const data = await response.json();
                    const locationName = service.parser(data);
                    if (locationName) return locationName;
                }
            } catch (error) {
                console.error(`${service.name} error:`, error);
            }
        }
        
        return `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`;
    };
    
    const handleTrackLocation = () => {
        setIsTrackingLocation(true);
        setLocationDebug('');
        
        if (!navigator.geolocation) {
            setLocationDebug(t('profile.locationNotSupported'));
            setIsTrackingLocation(false);
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    const locationName = await getLocationName(latitude, longitude);
                    setLocation(locationName);
                    localStorage.setItem('userLocation', locationName);
                    localStorage.setItem('userLocationCoords', JSON.stringify({ latitude, longitude }));
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent('locationUpdated', { detail: locationName }));
                    setLocationDebug('');
                } catch (error) {
                    const fallbackLocation = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
                    setLocation(fallbackLocation);
                    localStorage.setItem('userLocation', fallbackLocation);
                    localStorage.setItem('userLocationCoords', JSON.stringify({ latitude, longitude }));
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent('locationUpdated', { detail: fallbackLocation }));
                    setLocationDebug('');
                }
                
                setIsTrackingLocation(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                setLocationDebug(t('profile.locationError'));
                setIsTrackingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 300000
            }
        );
    };
    
    const handleSetLocation = () => {
        if (inputLocation.trim()) {
            setLocation(inputLocation.trim());
            localStorage.setItem('userLocation', inputLocation.trim());
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('locationUpdated', { detail: inputLocation.trim() }));
            setInputLocation('');
            setLocationDebug('');
        }
    };
    
    const handleClearLocation = () => {
        setLocation('');
        localStorage.removeItem('userLocation');
        localStorage.removeItem('userLocationCoords');
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('locationUpdated', { detail: '' }));
        setLocationDebug('');
    };
    
    if (!user) {
        return (
            <div className="main-content">
                <h2 className="page-title">{t('profile.loading')}</h2>
            </div>
        );
    }
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('profile.title')}</h2>
            <div className="form-container">
                {/* Profile Picture Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid #ff6699',
                        marginBottom: '15px',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {(isEditing ? editedProfilePicture : user.profilePicture) ? (
                            <img 
                                src={isEditing ? editedProfilePicture : user.profilePicture} 
                                alt="Profile" 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <div style={{
                                fontSize: '60px',
                                color: '#ff6699',
                                fontWeight: 'bold'
                            }}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    
                    {isEditing && (
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                id="profile-picture-upload"
                            />
                            <label 
                                htmlFor="profile-picture-upload"
                                className="btn btn-secondary"
                                style={{
                                    cursor: 'pointer',
                                    display: 'inline-block',
                                    fontSize: '14px',
                                    padding: '8px 16px'
                                }}
                            >
                                {t('profile.changePhoto')}
                            </label>
                        </div>
                    )}
                </div>
                {/* Account Details */}
                <div style={{
                    backgroundColor: '#fff5f8',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '2px solid #ffccdd'
                }}>
                    <h3 style={{ 
                        color: '#660066', 
                        marginBottom: '15px',
                        fontSize: '18px'
                    }}>
                        {t('profile.accountDetails')}
                    </h3>
                    
                    <div className="form-group">
                        <label>{t('profile.fullName')}</label>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={editedName} 
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        ) : (
                            <input 
                                type="text" 
                                value={user.name} 
                                readOnly
                            />
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>{t('profile.emailLabel')}</label>
                        <input 
                            type="email" 
                            value={user.email} 
                            readOnly
                            style={{ backgroundColor: '#f0f0f0' }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('profile.memberSinceLabel')}</label>
                        <input 
                            type="text" 
                            value={user.memberSince} 
                            readOnly
                            style={{ backgroundColor: '#f0f0f0' }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t('profile.bioLabel')}</label>
                        {isEditing ? (
                            <textarea
                                value={editedBio}
                                onChange={(e) => setEditedBio(e.target.value)}
                                placeholder={t('profile.bioPlaceholder')}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '2px solid #ff99cc',
                                    fontFamily: 'inherit',
                                    fontSize: '14px',
                                    resize: 'vertical'
                                }}
                            />
                        ) : (
                            <div style={{
                                padding: '10px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '4px',
                                minHeight: '60px',
                                border: '1px solid #e0e0e0',
                                color: user.bio ? '#333' : '#999',
                                fontStyle: user.bio ? 'normal' : 'italic'
                            }}>
                                {user.bio || t('profile.noBio')}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Location Section */}
                <div style={{
                    backgroundColor: '#f0f8ff',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '2px solid #cce7ff'
                }}>
                    <h3 style={{ 
                        color: '#660066', 
                        marginBottom: '15px',
                        fontSize: '18px'
                    }}>
                        {t('profile.locationTitle')}
                    </h3>
                    
                    {location ? (
                        <div>
                            <div style={{
                                padding: '12px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                fontWeight: '500'
                            }}>
                                📍 {location}
                            </div>
                            <button 
                                className="btn btn-secondary" 
                                onClick={handleClearLocation}
                                style={{
                                    fontSize: '14px',
                                    padding: '8px 16px'
                                }}
                            >
                                {t('profile.changeLocation')}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p style={{
                                color: '#666',
                                marginBottom: '15px',
                                fontStyle: 'italic'
                            }}>
                                {t('profile.addLocationPrompt')}
                            </p>
                            
                            <button 
                                className="btn btn-primary" 
                                onClick={handleTrackLocation}
                                disabled={isTrackingLocation}
                                style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                    fontSize: '14px',
                                    padding: '10px'
                                }}
                            >
                                {isTrackingLocation ? t('profile.detectingLocation') : t('profile.trackMyLocation')}
                            </button>
                            
                            {locationDebug && (
                                <div style={{
                                    fontSize: '12px',
                                    padding: '8px',
                                    background: '#fff3cd',
                                    border: '1px solid #ffc107',
                                    borderRadius: '4px',
                                    marginBottom: '10px',
                                    color: '#856404'
                                }}>
                                    {locationDebug}
                                </div>
                            )}
                            
                            <div style={{
                                textAlign: 'center',
                                margin: '10px 0',
                                color: '#999',
                                fontSize: '13px'
                            }}>
                                {t('profile.orEnterManually')}
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                gap: '8px'
                            }}>
                                <input 
                                    type="text" 
                                    value={inputLocation}
                                    onChange={(e) => setInputLocation(e.target.value)}
                                    placeholder={t('profile.enterLocationPlaceholder')}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        fontSize: '14px',
                                        borderRadius: '4px',
                                        border: '2px solid #cce7ff'
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSetLocation();
                                        }
                                    }}
                                />
                                <button 
                                    className="btn btn-secondary"
                                    onClick={handleSetLocation}
                                    disabled={!inputLocation.trim()}
                                    style={{
                                        fontSize: '14px',
                                        padding: '8px 16px'
                                    }}
                                >
                                    {t('profile.setLocationButton')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Action Buttons */}
                <div style={{
                    display: 'flex', 
                    gap: '10px', 
                    justifyContent: 'center', 
                    marginTop: '20px',
                    flexWrap: 'wrap'
                }}>
                    {isEditing ? (
                        <>
                            <button className="btn btn-primary" onClick={handleSaveProfile}>
                                {t('profile.saveProfile')}
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                {t('profile.cancelEdit')}
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                {t('profile.editProfile')}
                            </button>
                            <button className="btn btn-primary" onClick={() => window.location = "#cart"}>
                                {t('profile.viewCart')}
                            </button>
                            <button className="btn btn-secondary" onClick={() => window.location = "#likes"}>
                                {t('profile.viewLikes')}
                            </button>
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => setShowLogoutConfirm(true)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    borderColor: '#dc3545'
                                }}
                            >
                                {t('profile.logout')}
                            </button>
                        </>
                    )}
                </div>
            </div>
            
            {/* Logout Confirmation Popup */}
            <ConfirmPopup 
                show={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
                title="Logout"
                message={t('profile.logoutConfirm')}
                confirmText={t('profile.logout')}
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
};

export default ProfilePage;