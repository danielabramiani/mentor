import React from 'react';
import '../css/About.css'
const About = () => (
  <section className="about-section" id="about">
    <h2>ჩვენს შესახებ</h2>
    <div className="about-grid">
      <div className="about-text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div className="about-stats">
        <div className="stat"><span>10+</span><p>წელი</p></div>
        <div className="stat"><span>50+</span><p>კურსი</p></div>
      </div>
    </div>
  </section>
);

export default About;