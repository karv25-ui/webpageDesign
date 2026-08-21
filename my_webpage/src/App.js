import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import KapturedMoment from './components/KapturedMoment.png';
import Home from './components/Home';
import Nav from './components/Nav';
import EntranceSplash from './components/EntranceSplash';
import './App.css';

// Placeholders until Portfolio.js / Contact.js are wired in — keeps the nav
// links from routing to blank pages in the meantime.
function Portfolio() {
  return (
    <div className="portfolio-placeholder">
      <h2>Portfolio</h2>
      <p>Coming soon — building this next.</p>
    </div>
  );
}
function Contact() {
  return (
    <div className="portfolio-placeholder">
      <h2>Contact</h2>
      <p>Coming soon — building this next.</p>
    </div>
  );
}

// How long the shutter stays fully closed before content changes
// underneath it — see .lens-shutter keyframes in App.css (closed window
// is 30%–55% of the 900ms animation, so this sits comfortably inside it).
const SWAP_AT_MS = 380;

function AppShell({ children, onLogoClick, onNavigate }) {
  return (
    <div className="App">
      <div className="background">
        <header className="header">
          <button
            type="button"
            className="logo-link"
            onClick={onLogoClick}
            aria-label="Toggle entrance screen"
          >
            <img src={KapturedMoment} alt="Kaptured Moment" className="logo" />
          </button>
          <Nav onNavigate={onNavigate} />
        </header>

        <div className="landing-page">{children}</div>

        <div className="footer">
          <p>&copy; 2026 Kaptured Moment. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [flashKey, setFlashKey] = useState(0);
  const swapTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => () => clearTimeout(swapTimeout.current), []);

  // Central "flash, then act" helper — every shutter moment in the app
  // (entrance toggle, nav link clicks) routes through here, so the timing
  // and visual only ever need to be tuned in one place.
  const runWithFlash = (action) => {
    clearTimeout(swapTimeout.current);
    setFlashKey((k) => k + 1);
    swapTimeout.current = setTimeout(action, SWAP_AT_MS);
  };

  const toggleSplash = () => {
    runWithFlash(() => setShowSplash((prev) => !prev));
  };

  const handleHeaderLogoClick = () => {
    runWithFlash(() => {
      navigate('/');
      setShowSplash((prev) => !prev);
    });
  };

  const handleNavigate = (path) => {
    if (path === location.pathname) return; // already there — no flash needed
    runWithFlash(() => navigate(path));
  };

  return (
    <>
      <AppShell onLogoClick={handleHeaderLogoClick} onNavigate={handleNavigate}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppShell>

      {showSplash && <EntranceSplash onLogoClick={toggleSplash} />}

      {flashKey > 0 && (
  <div key={flashKey} className="lens-shutter" aria-hidden="true" />
)}
    </>
  );
}

export default App;

/* 
* Add a "Home" button to either the header or footer to help users navigate back to the main page from other routes easily. 
Help users have a clear way to return to the homepage seamlessly.
* A header navigation bar with links to different sections of the website (ex. Home, Portfolio, Contact).
* The transition between each route should be smooth & visually appealing. Animations should be like a camera shutter effect to each route to enhance the experience of the website/app.
* The website/app should be responsive and optimized for different screen sizes and devices. 
* The website/app should be accessible to users with disabilities, including those who use screen readers or keyboard navigation.
* The website/app should have a consistent design and branding throughout all pages and components. 

*/