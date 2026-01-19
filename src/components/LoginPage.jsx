import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loginUser, getCurrentUser } from '../utils/auth';

const LoginPage = () => {
    const { t } = useTranslation();
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
    
    const handleLogin = () => {
        setError('');
        
        // Validation
        if (!email) {
            alert(t('alerts.emailRequired'));
            return;
        }
        if (!password) {
            alert(t('alerts.passwordRequired'));
            return;
        }
        
        // Attempt login
        const result = loginUser(email, password);
        
        if (result.success) {
            alert(t('alerts.loginSuccess', { email: result.user.email }));
            window.location = "#profile";
        } else {
            setError(t('alerts.loginError'));
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    
    return (
        <div className="main-content">
            <h2 className="page-title">{t('login.title')}</h2>
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
                    <label>{t('login.emailLabel')}</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('login.emailPlaceholder')}
                    />
                </div>
                <div className="form-group">
                    <label>{t('login.passwordLabel')}</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('login.passwordPlaceholder')}
                    />
                </div>
                <div className="form-buttons">
                    <button className="btn btn-primary" onClick={handleLogin}>
                        {t('login.loginButton')}
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location = "#signup"}>
                        {t('login.signupButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;