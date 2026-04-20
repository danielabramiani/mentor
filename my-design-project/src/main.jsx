import React, { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/Main.css';
import NavBar from './jsx/NavBar.jsx';
import Hero from './jsx/Hero.jsx';
import About from './jsx/About.jsx';
import CoursesList from './jsx/CoursesList.jsx';
import Mentor from './jsx/Mentor.jsx';
import Course from './jsx/Course.jsx';
import Footer from './jsx/Footer.jsx';
import Loader from './Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <StrictMode>
      <NavBar />
      <Hero />
      <About />
      <CoursesList />
      <Mentor />
      <Course />
      <Footer />
    </StrictMode>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);