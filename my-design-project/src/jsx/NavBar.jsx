import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../css/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          LAWCRAFT <span>ACADEMY</span>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>მთავარი</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>ჩვენს შესახებ</a></li>
          <li><a href="#courses" onClick={() => setIsMenuOpen(false)}>კურსები</a></li>
          <li><a href="#mentors" onClick={() => setIsMenuOpen(false)}>მენტორები</a></li>
          <li className="mobile-only">
            <a href="#register" className="nav-btn" onClick={() => setIsMenuOpen(false)}>რეგისტრაცია</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;