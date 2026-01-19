/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LocationPopup = ({ show, onClose, location, onTrackLocation, onSetLocation }) => {
    const { t } = useTranslation();
    const [inputLocation, setInputLocation] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');
    
    // Listen for location updates from other components (like ProfilePage)
    React.useEffect(() => {
        const handleLocationUpdate = (e) => {
            // The parent component (MainNav) will handle updating its location state
            // This will automatically update the location prop passed to this component
        };
        
        window.addEventListener('locationUpdated', handleLocationUpdate);
        
        return () => {
            window.removeEventListener('locationUpdated', handleLocationUpdate);
        };
    }, []);
    
    if (!show) return null;
    
    // Function to get location name from coordinates using multiple services
    const getLocationName = async (latitude, longitude) => {
        const services = [
            // Service 1: BigDataCloud (most reliable, no API key)
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
            // Service 2: LocationIQ
            {
                name: 'LocationIQ',
                url: `https://us1.locationiq.com/v1/reverse?key=pk.0f147952a41c555c5b70614039fd148b&lat=${latitude}&lon=${longitude}&format=json`,
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
            },
            // Service 3: Nominatim
            {
                name: 'Nominatim',
                url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                parser: (data) => {
                    const address = data.address || {};
                    const city = address.city || address.town || address.village || address.municipality || address.county;
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
        
        // Try each service in order
        for (const service of services) {
            try {
                setDebugInfo(`Trying ${service.name}...`);
                const response = await fetch(service.url, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const locationName = service.parser(data);
                    
                    if (locationName) {
                        setDebugInfo(`✓ ${service.name} success: ${locationName}`);
                        return locationName;
                    }
                }
                setDebugInfo(`⚠ ${service.name} failed, trying next...`);
            } catch (error) {
                console.error(`${service.name} error:`, error);
                setDebugInfo(`⚠ ${service.name} error, trying next...`);
            }
        }
        
        // If all services fail, return coordinates
        return `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E`;
    };
    
    const handleTrackLocation = () => {
        setIsTracking(true);
        setDebugInfo('🔍 Checking browser location support...');
        
        if (!navigator.geolocation) {
            setDebugInfo('❌ Geolocation not supported by this browser');
            setIsTracking(false);
            return;
        }
        
        setDebugInfo('✓ Geolocation supported\n🌍 Requesting your position...');
        
        // Get position with optimized settings
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                setDebugInfo(`✓ Position acquired!\nLat: ${latitude.toFixed(6)}\nLon: ${longitude.toFixed(6)}\nAccuracy: ${accuracy.toFixed(0)}m\n\n🔄 Getting location name...`);
                
                try {
                    const locationName = await getLocationName(latitude, longitude);
                    setDebugInfo(`✓ Complete!\nLocation: ${locationName}`);
                    
                    // Call parent handler
                    onTrackLocation(locationName, { latitude, longitude, accuracy });
                    
                } catch (error) {
                    console.error('Error getting location name:', error);
                    const fallbackLocation = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
                    setDebugInfo(`⚠ Couldn't get city name\nUsing coordinates: ${fallbackLocation}`);
                    onTrackLocation(fallbackLocation, { latitude, longitude, accuracy });
                }
                
                setIsTracking(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                setIsTracking(false);
                
                // Just log to debug, no alerts
                let debugMsg = '';
                
                switch(error.code) {
                    case 1:
                        debugMsg = '❌ Permission denied - Please allow location access in browser settings';
                        break;
                    case 2:
                        debugMsg = '❌ Position unavailable - Check location services';
                        break;
                    case 3:
                        debugMsg = '❌ Request timeout - Try again';
                        break;
                    default:
                        debugMsg = `❌ Error: ${error.message || 'Unknown error'}`;
                }
                
                setDebugInfo(debugMsg);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 300000
            }
        );
    };
    
    return (
        <div className="popup location-popup">
            <h3>{t('location.title')}</h3>
            {location ? (
                <div>
                    <div style={{
                        marginBottom: '10px', 
                        padding: '12px', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: '500'
                    }}>
                        📍 {location}
                    </div>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                            onSetLocation('');
                            setDebugInfo('');
                        }}
                        style={{width: '100%', marginBottom: '10px'}}
                    >
                        {t('location.changeLocation') || 'Change Location'}
                    </button>
                </div>
            ) : (
                <>
                    <button 
                        className="btn btn-primary" 
                        onClick={handleTrackLocation} 
                        style={{
                            width: '100%', 
                            marginBottom: '10px',
                            padding: '12px',
                            fontSize: '15px',
                            fontWeight: '600'
                        }}
                        disabled={isTracking}
                    >
                        {isTracking ? '🔄 Detecting Location...' : '📍 Use My Current Location'}
                    </button>
                    
                    {debugInfo && (
                        <div style={{
                            fontSize: '11px', 
                            padding: '10px', 
                            background: '#f8f9fa', 
                            border: '1px solid #e9ecef',
                            borderRadius: '6px',
                            marginBottom: '12px',
                            whiteSpace: 'pre-line',
                            color: '#495057',
                            fontFamily: 'Consolas, Monaco, monospace',
                            maxHeight: '120px',
                            overflowY: 'auto'
                        }}>
                            {debugInfo}
                        </div>
                    )}
                    
                    <div style={{
                        textAlign: 'center', 
                        margin: '15px 0', 
                        color: '#6c757d', 
                        fontWeight: '600',
                        fontSize: '13px'
                    }}>
                        {t('location.or') || '— OR ENTER MANUALLY —'}
                    </div>
                    
                    <div className="form-group">
                        <label style={{fontWeight: '600', marginBottom: '6px', display: 'block'}}>
                            {t('location.enterLocation') || 'Enter Your Location'}
                        </label>
                        <input 
                            type="text" 
                            value={inputLocation} 
                            onChange={(e) => setInputLocation(e.target.value)}
                            placeholder={t('location.enterAreaPlaceholder') || 'e.g., New York, USA'}
                            style={{
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '6px',
                                border: '1px solid #ced4da'
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && inputLocation.trim()) {
                                    onSetLocation(inputLocation);
                                    setInputLocation('');
                                    setDebugInfo('');
                                }
                            }}
                        />
                    </div>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                            if (inputLocation.trim()) {
                                onSetLocation(inputLocation);
                                setInputLocation('');
                                setDebugInfo('');
                            }
                        }}
                        style={{width: '100%', padding: '10px'}}
                        disabled={!inputLocation.trim()}
                    >
                        {t('location.setLocation') || 'Set Location'}
                    </button>
                </>
            )}
            <button 
                onClick={() => {
                    onClose();
                    setDebugInfo('');
                }} 
                style={{
                    marginTop: '10px', 
                    background: '#6c757d', 
                    color: 'white',
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                {t('location.close') || 'Close'}
            </button>
        </div>
    );
};

export default LocationPopup;