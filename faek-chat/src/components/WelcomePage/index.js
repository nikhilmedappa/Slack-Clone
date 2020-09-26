import React from 'react';
import './styles.css';
import logo from '../../assets/logo/faek.svg'
import faekIllustration from '../../assets/logo/faek-welcome.svg'
import { Link } from 'react-router-dom'






function WelcomePage() {
  return (
    <div className="WelcomePage">
      <div className="dark-bg-welcome">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <button className="signin-btn"><Link to="/signin">Sign In</Link></button>
          <p className="description">New to Faek? We’ll help you <a href="/register" rel="noopener noreferrer" target="_blank">get started</a>.</p>
          <img className="illustration" src={faekIllustration} alt="chat illustration" />
      </div>
    </div>
  );
}

export default WelcomePage;
