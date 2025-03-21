import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Custom styles

// Import images from assets folder
import qt from '../assets/qt.png';
import ap from '../assets/ap.png';
import ob from '../assets/ob.png';

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <h1 className="text-3xl font-bold">Welcome to Agricultural Tools Rental</h1>
                <div className="button-container">
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <h2>Why Choose Us?</h2>
                <div className="features">
                    <div className="feature-card">
                        <img src={qt} alt="Quality Tools" />
                        <h3>Quality Tools</h3>
                        <p>Rent only the best agricultural equipment.</p>
                    </div>
                    <div className="feature-card">
                        <img src={ap} alt="Affordable Prices" />
                        <h3>Affordable Prices</h3>
                        <p>Lowest rental rates guaranteed.</p>
                    </div>
                    <div className="feature-card">
                        <img src={ob} alt="Easy Booking" />
                        <h3>Easy Booking</h3>
                        <p>Hassle-free online reservations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
