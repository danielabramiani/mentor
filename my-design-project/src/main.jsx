import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/Main.css'
import NavBar from './jsx/NavBar.jsx'
import Hero from './jsx/Hero.jsx'
import About from './jsx/About.jsx'
import CoursesList from './jsx/CoursesList.jsx'
import Mentor from './jsx/Mentor.jsx'
import Course from './jsx/Course.jsx'
import Footer from './jsx/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <Hero />
    <About />
    <CoursesList />
    <Mentor />
    <Course />
    <Footer />
  </StrictMode>
)
