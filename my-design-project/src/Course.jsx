import React from 'react';
import './App.css';
import mentorImg from './image2.png';
import logoImg from './image.png';

const LawAcademy = () => {
  const MagnifyingGlass = () => (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  return (
    <div className="site-wrapper">
      <header className="hero-section">
        <div className="top-row">
          <div className="top-image-container">
            <img 
              src={logoImg} 
              alt="Law School Logo" 
              className="flush-img" 
            />
          </div>
          
          <div className="top-image-container">
            <img 
              src={mentorImg} 
              alt="Mentor" 
              className="flush-img" 
            />
          </div>
        </div>

        <div className="main-info">
          <h1 className="title">ააიპ სამართლებრივი პრაქტიკის აკადემია</h1>
          <div className="details">
            <div className="schedule">
              <p>სამშაბათი: 20:00</p>
              <p>პარასკევი: 20:00</p>
            </div>
            <div className="mentor-name">
              <p>მენტორი: ბექა ხუფენია</p>
            </div>
          </div>
        </div>
      </header>

      <footer className="features-bar">
        <div className="feature-item">
          <div className="icon-circle"><MagnifyingGlass /></div>
          <p>შუამდგომლობის შედგენის მეთოდიკა</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><MagnifyingGlass /></div>
          <p>გამოკითხვის და გამოძიების დროს პირის მოწმედ დაკითხვის წესი</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><MagnifyingGlass /></div>
          <p>დათვალიერების ზოგადი წესი</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><MagnifyingGlass /></div>
          <p>ექსპერტიზის დანიშვნის საფუძველი</p>
        </div>
        <div className="feature-item">
          <div className="icon-circle"><MagnifyingGlass /></div>
          <p>ნიმუშის აღება</p>
        </div>
      </footer>
    </div>
  );
};

export default LawAcademy;