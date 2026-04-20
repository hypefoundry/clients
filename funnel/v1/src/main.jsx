import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './HomePage.jsx'
import LandingPage from './LandingPage.jsx'
import DiagnosisPage from './DiagnosisPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
