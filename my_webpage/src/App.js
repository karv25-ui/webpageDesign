import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import KapturedMoment from './components/KapturedMoment.png';
import Home from './components/Home';
import Contact from './components/layout/Contact';
import About from './components/layout/About';
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

// Flash: peak-white window is 10%–60% of its 700ms animation (see
// @keyframes cameraFlash in App.css) — 350ms sits comfortably inside it.
const FLASH_SWAP_MS = 350;
// Shutter: fully-closed window is 30%–55% of its 900ms animation (see
// @keyframes lensShutter in App.css) — 380ms sits comfortably inside it.
const SHUTTER_SWAP_MS = 380;
// Theme fade: peak-opacity is at 50% of its 400ms animation (see
// @keyframes themeFade in App.css) — 200ms sits right at that peak.
const THEME_FADE_MS = 200;

const THEME_KEY = 'km-theme';

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}


function AppShell({ children, onLogoClick, onNavigate, theme, onToggleTheme }) {
  return (
    <div className="App" data-theme={theme}>
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
          <div className="header-right">
            <Nav onNavigate={onNavigate} />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
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
  const [showSplash, setShowSplash] = useState(() => {
    const stored = sessionStorage.getItem('km-show-splash');
    return stored === null ? true : stored === 'true';
  });
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'dark');
  const [flashKey, setFlashKey] = useState(0);
  const [shutterKey, setShutterKey] = useState(0);
  const [themeFadeKey, setThemeFadeKey] = useState(0);
  const flashTimeout = useRef(null);
  const shutterTimeout = useRef(null);
  const themeFadeTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('km-show-splash', String(showSplash));
  }, [showSplash]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => () => {
    clearTimeout(flashTimeout.current);
    clearTimeout(shutterTimeout.current);
    clearTimeout(themeFadeTimeout.current);
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

  const toggleTheme = () => {
    clearTimeout(themeFadeTimeout.current);
    setThemeFadeKey((k) => k + 1);
    themeFadeTimeout.current = setTimeout(() => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, THEME_FADE_MS);
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
      <AppShell 
      onLogoClick={handleHeaderLogoClick}
       onNavigate={handleNavigate} 
       onThemeToggle={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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
       {themeFadeKey > 0 && (
        <div key={themeFadeKey} className="theme-fade" aria-hidden="true" />
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

* Keep the same consistent design and branding throughout all pages and components, including color schemes, typography, and imagery.
(Ex. The picture frame style border around the main content area should be consistent across all pages.)
*/