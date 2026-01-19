import React, { useState, useEffect } from 'react';
import './App.css';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import { products } from './data/products';
import Header from './components/Header';
import MainNav from './components/MainNav';
import SubNav from './components/SubNav';
import Sidebar from './components/Sidebar';
import HomePageContent from './components/HomePageContent';
import ProductShowcase from './components/ProductShowcase';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import LikesPage from './components/LikesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import AboutPage from './components/AboutPage';
import InvestPage from './components/InvestPage';
import PaymentPage from './components/PaymentPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import NotificationPopup from './components/NotificationPopup';

function App() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState('home');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [cartItems, setCartItems] = useState([]);
    const [likeItems, setLikeItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [infoSection, setInfoSection] = useState('');
    
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');
    const [notificationTitle, setNotificationTitle] = useState('');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            
            if (hash === 'home' || hash === '') {
                setCurrentPage('home');
                setCurrentProduct(null);
            } else if (hash.startsWith('product/')) {
                const productId = parseInt(hash.split('/')[1]);
                const product = products.find(p => p.id === productId);
                if (product) {
                    setCurrentProduct({...product});
                    setCurrentPage('product');
                } else {
                    console.error(`Product with id ${productId} not found`);
                    setCurrentPage('home');
                    setCurrentProduct(null);
                }
            } else if (hash.startsWith('category/')) {
                const category = hash.split('/')[1];
                setCurrentCategory(category);
                setCurrentPage('category');
            } else if (hash === 'cart') {
                setCurrentPage('cart');
            } else if (hash === 'likes') {
                setCurrentPage('likes');
            } else if (hash === 'login') {
                setCurrentPage('login');
            } else if (hash === 'signup') {
                setCurrentPage('signup');
            } else if (hash === 'profile') {
                setCurrentPage('profile');
            } else if (hash.startsWith('search')) {
                setCurrentPage('search');
                const params = new URLSearchParams(hash.split('?')[1]);
                setSearchQuery(params.get('q') || '');
                setSearchCategory(params.get('category') || '');
            } else if (hash.startsWith('about')) {
                setCurrentPage('about');
                const section = hash.split('/')[1];
                setInfoSection(section || '');
            } else if (hash.startsWith('invest')) {
                setCurrentPage('invest');
                const section = hash.split('/')[1];
                setInfoSection(section || '');
            } else if (hash.startsWith('payment')) {
                setCurrentPage('payment');
                const section = hash.split('/')[1];
                setInfoSection(section || '');
            } else if (hash.startsWith('contact')) {
                setCurrentPage('contact');
                const section = hash.split('/')[1];
                setInfoSection(section || '');
            }
        };
        
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    
    const handleViewProduct = (product) => {
        setCurrentProduct({...product});
        setCurrentPage('product');
        window.location.hash = `product/${product.id}`;
    };
    
    const handleViewCategory = (category) => {
        window.location.hash = `category/${category}`;
    };
    
    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
        // Get the translated product name using the translation key
        const productName = t(`products.${product.id}.name`);
        setNotificationTitle('Added to Cart!');
        setNotificationMessage(`"${productName}" has been added to your cart.`);
        setNotificationType('cart');
        setShowNotification(true);
    };
    
    const handleRemoveFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };
    
    const handleAddToLike = (product) => {
        setLikeItems([...likeItems, product]);
        // Get the translated product name using the translation key
        const productName = t(`products.${product.id}.name`);
        setNotificationTitle('Added to Likes!');
        setNotificationMessage(`"${productName}" has been added to your favorites.`);
        setNotificationType('like');
        setShowNotification(true);
    };
    
    const handleRemoveFromLikes = (index) => {
        const newLikeItems = [...likeItems];
        newLikeItems.splice(index, 1);
        setLikeItems(newLikeItems);
    };
    
    const handleViewCart = () => {
        window.location.hash = "cart";
        setCurrentPage('cart');
    };
    
    const handleViewLikes = () => {
        window.location.hash = "likes";
        setCurrentPage('likes');
    };
    
    const renderContent = () => {
        switch(currentPage) {
            case 'home':
                return <HomePageContent onViewProduct={handleViewProduct} onViewCategory={handleViewCategory} />;
            case 'product':
                return <ProductShowcase product={currentProduct} onAddToCart={handleAddToCart} onAddToLike={handleAddToLike} />;
            case 'category':
                return <CategoryPage category={currentCategory} onViewProduct={handleViewProduct} />;
            case 'cart':
                return <CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />;
            case 'likes':
                return <LikesPage likeItems={likeItems} onRemoveFromLikes={handleRemoveFromLikes} onAddToCart={handleAddToCart} />;
            case 'login':
                return <LoginPage />;
            case 'signup':
                return <SignupPage />;
            case 'profile':
                return <ProfilePage />;
            case 'search':
                return <SearchPage query={searchQuery} category={searchCategory} onViewProduct={handleViewProduct} />;
            case 'about':
                return <AboutPage section={infoSection} />;
            case 'invest':
                return <InvestPage section={infoSection} />;
            case 'payment':
                return <PaymentPage section={infoSection} />;
            case 'contact':
                return <ContactPage section={infoSection} />;
            default:
                return <HomePageContent onViewProduct={handleViewProduct} onViewCategory={handleViewCategory} />;
        }
    };
    
    return (
        <div className="app-container">
            <Header />
            <MainNav cartItems={cartItems} likeItems={likeItems} onViewCart={handleViewCart} onViewLikes={handleViewLikes} />
            <SubNav />
            <div className="content-container">
                <Sidebar onViewCategory={handleViewCategory} />
                {renderContent()}
            </div>
            <div className="back-to-top-container">
                <button className="back-to-top" onClick={scrollToTop}>
                    {t('common.backToTop')}
                </button>
            </div>
            <Footer />
            
            <NotificationPopup 
                show={showNotification}
                onClose={() => setShowNotification(false)}
                message={notificationMessage}
                type={notificationType}
                title={notificationTitle}
                t={t}
            />
        </div>
    );
}

export default App;