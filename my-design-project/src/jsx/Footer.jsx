import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import footerLogo from '../assets/image/image2.png'; 
import '../css/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo-container">
        <img src={footerLogo} alt="Lawcraft Academy Logo" className="footer-img-logo" />
      </div>
      
      <div className="footer-socials">
        <a href="#" className="footer-social-link"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="#" className="footer-social-link"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#" className="footer-social-link"><FontAwesomeIcon icon={faLinkedin} /></a>
        <a href="#" className="footer-social-link"><FontAwesomeIcon icon={faTwitter} /></a>
      </div>

      <div className="footer-info">
        <p>© 2026 ყველა უფლება დაცულია</p>
        <p>თბილისი, საქართველო | Lawcraft Academy</p>
      </div>
      
      <div className="footer-bottom-line"></div>
    </div>
  </footer>
);

export default Footer;