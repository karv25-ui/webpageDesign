import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import KapturedMoment from './components/KapturedMoment.png';
import Home from './components/Home';
import EntranceSplash from './components/EntranceSplash';
import './App.css';

// Placeholder until Portfolio.js exists — keeps the "Explore My Portfolio"
// button from linking to a blank route in the meantime.
function Portfolio() {
  return (
    <div className="portfolio-placeholder">
      <h2>Portfolio</h2>
      <p>Coming soon — building this next.</p>
    </div>
  );
}

// When to actually flip showSplash, relative to the click — timed to land
// while .camera-flash (see App.css) is still fully opaque, so the swap is
// hidden under solid white instead of popping visibly.
const SWAP_AT_MS = 350;

function AppShell({ children, onLogoClick }) {
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
        </header>

        <div className="landing-page">{children}</div>

        <div className="footer">
          <p>&copy; 2026 Kaptured Moment. All rights reserved. Made with love!</p>
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

  useEffect(() => () => clearTimeout(swapTimeout.current), []);

  // Shared by the splash's own logo AND the header logo — always
  // clickable, never disabled. Clicking again mid-flash just bumps
  // flashKey, which remounts the flash div and restarts its animation
  // cleanly, and reschedules the swap from scratch.
  const toggleSplash = () => {
    clearTimeout(swapTimeout.current);
    setFlashKey((k) => k + 1);
    swapTimeout.current = setTimeout(() => {
      setShowSplash((prev) => !prev);
    }, SWAP_AT_MS);
  };

  const handleHeaderLogoClick = () => {
    navigate('/');
    toggleSplash();
  };

  return (
    <>
      <AppShell onLogoClick={handleHeaderLogoClick}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </AppShell>

      {showSplash && <EntranceSplash onLogoClick={toggleSplash} />}

      {flashKey > 0 && (
        <div key={flashKey} className="camera-flash" aria-hidden="true" />
      )}
    </>
  );
}

export default App;

/* 
* Add a "Home" button to either the header or footer to help users navigate back to the main page from other routes easily. 
Help users have a clear way to return to the homepage seamlessly.
* A header navigation bar with links to different sections of the website (ex. Home, Portfolio, Contact).

*/