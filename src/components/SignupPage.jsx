import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { registerUser, getCurrentUser } from '../utils/auth';

const SignupPage = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        // Redirect if already logged in
        const user = getCurrentUser();
        if (user) {
            window.location = "#profile";
        }
    }, []);
    
    const handleSignup = () => {
        setError('');
        
        // Validation
        if (!name) {
            alert(t('alerts.nameRequired'));
            return;
        }
        if (!email) {
            alert(t('alerts.emailRequired'));
            return;
        }
        if (!password) {
            alert(t('alerts.passwordRequired'));
            return;
        }
        
        // Attempt registration
        const result = registerUser(name, email, password);
        
        if (result.success) {
            alert(t('alerts.signupSuccess', { name }));
            // Auto-login after signup
            window.location = "#profile";
        } else {
            setError(t('alerts.signupError'));
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignup();
        }
    };
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('signup.title')}</h2>
            <div className="form-container">
                {error && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '15px',
                        backgroundColor: '#ffebee',
                        border: '1px solid #f44336',
                        borderRadius: '4px',
                        color: '#c62828',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label>{t('signup.fullNameLabel')}</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('signup.namePlaceholder')}
                    />
                </div>
                <div className="form-group">
                    <label>{t('signup.emailLabel')}</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('signup.emailPlaceholder')}
                    />
                </div>
                <div className="form-group">
                    <label>{t('signup.passwordLabel')}</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('signup.passwordPlaceholder')}
                    />
                </div>
                <div className="form-buttons">
                    <button className="btn btn-primary" onClick={handleSignup}>
                        {t('signup.signupButton')}
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location = "#login"}>
                        {t('signup.loginButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;