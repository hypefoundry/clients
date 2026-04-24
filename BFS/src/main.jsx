import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './HomePage.jsx'
import LandingPage from './LandingPage.jsx'
import LandingPageV2 from './LandingPageV2.jsx'
import LandingPageV3 from './LandingPageV3.jsx'
import LandingPageV4 from './LandingPageV4.jsx'
import DiagnosisPage from './DiagnosisPage.jsx'
import ApplyPage from './ApplyPage.jsx'
import FoundersGuideToRebranding from './articles/FoundersGuideToRebranding.jsx'
import TheStrategyGap from './articles/TheStrategyGap.jsx'
import WhyYourRedesignIsntWorking from './articles/WhyYourRedesignIsntWorking.jsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/v2" element={<LandingPageV2 />} />
        <Route path="/v3" element={<LandingPageV3 />} />
        <Route path="/v4" element={<LandingPageV4 />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/read/founders-guide-to-rebranding" element={<FoundersGuideToRebranding />} />
        <Route path="/read/the-strategy-gap" element={<TheStrategyGap />} />
        <Route path="/read/why-your-redesign-isnt-working" element={<WhyYourRedesignIsntWorking />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
