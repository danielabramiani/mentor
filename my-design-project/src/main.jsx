import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Course from './Course.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Course />
  </StrictMode>,
)
