import React from 'react';
import './App.css';

const MentorCard = () => {
  return (
    <div className="card-wrapper">
      <div className="mentor-card-container">
        
        {/* Left Side: Text Content */}
        <div className="content-section">
          <div className="text-wrapper">
            <h2 className="name">Oleg</h2>
            <p className="role">Lawyer with experience / 33 years</p>

            {/* CONTACT INFO SECTION */}
            <div className="contact-info">
              <span>📞 +1 (555) 000-1234</span>
              <span>✉️ oleg.lawyer@example.com</span>
            </div>

            <div className="section">
              <h3 className="section-title">Goals/motivation:</h3>
              <ul className="list">
                <li>Improve your skills and stay competitive in the market.</li>
                <li>Gain specialized knowledge for certifications and exams.</li>
              </ul>
            </div>

            <div className="section">
              <h3 className="section-title">Behavior:</h3>
              <ul className="list">
                <li>Webinars, online courses, master classes.</li>
                <li>Uses LinkedIn and Facebook for networking.</li>
              </ul>
            </div>

            <div className="section">
              <h3 className="section-title">Pain Points:</h3>
              <ul className="list">
                <li>Difficult to find courses that meet modern requirements.</li>
              </ul>
            </div>

            <button className="register-button">
              Register on the course
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="image-section">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
            alt="Oleg"
          />
        </div>

      </div>
    </div>
  );
};

export default MentorCard;