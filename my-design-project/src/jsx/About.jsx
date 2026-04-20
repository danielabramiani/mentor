import React from 'react';
import { CheckCircle2, GraduationCap, Briefcase, Award, Users, Rocket } from 'lucide-react';
import '../css/About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <span className="about-subtitle">ჩვენს შესახებ</span>
          <h2 className="about-main-title">Lawcraft Academy</h2>
          <p className="about-tagline">
            ადგილი, სადაც თეორიული ცოდნა <span>რეალურ პრაქტიკად</span> გარდაიქმნება.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-content">
            <p className="main-description">
              ჩვენ ვეხმარებით დამწყებ და მოქმედ იურისტებს პროფესიულ ზრდაში თანამედროვე, პრაქტიკაზე დაფუძნებული განათლებით.
            </p>
            
            <div className="why-us">
              <h3>რატომ ჩვენ?</h3>
              <ul className="benefits-list">
                <li>
                  <CheckCircle2 className="benefit-icon" />
                  <div>
                    <strong>პრაქტიკული სწავლება</strong>
                    <p>არა მხოლოდ თეორია; რეალური დოკუმენტების შედგენა და სამუშაო გარემოსთვის საჭირო უნარები.</p>
                  </div>
                </li>
                <li>
                  <GraduationCap className="benefit-icon" />
                  <div>
                    <strong>გამოცდილი მენტორები</strong>
                    <p>სწავლება წამყვანი იურისტებისგან რეალური გამოცდილებით.</p>
                  </div>
                </li>
                <li>
                  <Briefcase className="benefit-icon" />
                  <div>
                    <strong>თანამედროვე მიდგომა</strong>
                    <p>პროგრამა მორგებულია ბაზრის მოთხოვნებზე, რომ დარჩე კონკურენტუნარიანი.</p>
                  </div>
                </li>
              </ul>
              <p className="cta-footer">შექმენი შენი პროფესიული მომავალი ჩვენთან ერთად.</p>
            </div>
          </div>

          <div className="about-stats-grid">
            <div className="stat-card">
              <Award size={32} />
              <span className="stat-number">100%</span>
              <p className="stat-label">პრაქტიკული კურსი</p>
            </div>
            <div className="stat-card">
              <Users size={32} />
              <span className="stat-number">ინდივიდუალური</span>
              <p className="stat-label">მიდგომა თითოეულთან</p>
            </div>
            <div className="stat-card highlighted">
              <Rocket size={32} color="#c5a059" />
              <span className="stat-number">ინოვაციური</span>
              <p className="stat-label">სწავლების მეთოდი</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;