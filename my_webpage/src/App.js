import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import KapturedMoment from './Kaptured Moment .png';
import Home from './components/Home';
import EntranceSplash from './EntranceSplash';
import './App.css';

/*Placeholder until Portfolio.js exists — keeps the "Explore My Portfolio"
button from linking to a blank route in the meantime. */

function Portfolio() {
  return (
    <div className="portfolio-placeholder">
      <h2>Portfolio</h2>
      <p>Coming soon — building this next.</p>
    </div>
  );
}

function AppShell({ children }) {
  return (
    <div className="App">
      <div className="background">
        <header className="header">
          <Link to="/" className="logo-link">
            <img src={KapturedMoment} alt="Kaptured Moment" className="logo" />
          </Link>
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
  const [entered, setEntered] = useState(false);

  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </AppShell>

      {!entered && <EntranceSplash onEnter={() => setEntered(true)} />}
    </BrowserRouter>
  );
}

export default App;