import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import KapturedMoment from './components/KapturedMoment.png';
import Home from './components/Home';
import Nav from './components/Nav';
import EntranceSplash from './components/EntranceSplash';
import './App.css';

// Placeholders until Portfolio.js / Contact.js are wired in.
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

// Flash: peak-white window is 10%–60% of its 700ms animation (see
// @keyframes cameraFlash in App.css) — 350ms sits comfortably inside it.
const FLASH_SWAP_MS = 350;
// Shutter: fully-closed window is 30%–55% of its 900ms animation (see
// @keyframes lensShutter in App.css) — 380ms sits comfortably inside it.
const SHUTTER_SWAP_MS = 380;

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
  const [shutterKey, setShutterKey] = useState(0);
  const flashTimeout = useRef(null);
  const shutterTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => () => {
    clearTimeout(flashTimeout.current);
    clearTimeout(shutterTimeout.current);
  }, []);

  // Splash toggle only — header logo, splash's own logo.
  const runWithFlash = (action) => {
    clearTimeout(flashTimeout.current);
    setFlashKey((k) => k + 1);
    flashTimeout.current = setTimeout(action, FLASH_SWAP_MS);
  };

  // Page-to-page nav only — Nav.js links.
  const runWithShutter = (action) => {
    clearTimeout(shutterTimeout.current);
    setShutterKey((k) => k + 1);
    shutterTimeout.current = setTimeout(action, SHUTTER_SWAP_MS);
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
    if (path === location.pathname) return; // already there — no shutter needed
    runWithShutter(() => navigate(path));
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
        <div key={flashKey} className="camera-flash" aria-hidden="true" />
      )}
      {shutterKey > 0 && (
        <div key={shutterKey} className="lens-shutter" aria-hidden="true" />
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