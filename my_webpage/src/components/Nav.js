import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
];

function Nav({ onNavigate }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  // Close the mobile menu once the route has actually changed (after the
  // flash-delayed navigation completes), so it never stays open mid-swap.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Escape closes the mobile menu and returns focus to the toggle button —
  // keyboard users should never get stranded inside an open menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Real <Link>s underneath (correct href, works with cmd/ctrl-click to
  // open in a new tab, fully keyboard operable) — we only intercept plain
  // left-clicks to route them through the flash transition instead of an
  // instant swap.
  const handleLinkClick = (e, path) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <nav className="nav" aria-label="Primary">
      <button
        type="button"
        ref={toggleRef}
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-nav-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
      </button>

      <ul id="primary-nav-menu" className={`nav-menu ${menuOpen ? 'nav-menu--open' : ''}`}>
        {LINKS.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                onClick={(e) => handleLinkClick(e, to)}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;

/* This is the Nav component for the Kaptured Moment website/app.
It serves as the navigation bar for the website/app, allowing users to navigate between different pages or sections of the website/app.
* The component consists of a navigation bar with links: It includes a list of links that users can click to navigate to different pages such as Home, About, Contact, Blog, Portfolio, Services, and Testimonials etc. 
* Currently, only the Home link is active and the others are commented out for future implementation.
* The Routes component: It defines the routes for the application. When a user clicks on a link, it will render the corresponding component based on the defined routes. 
* Currently, only the Home route is defined and the others are commented out for future implementation.
* The component will have a navbar that will be styled with CSS to match the design of the website/app in general. 
* The navbar will be responsive and will adapt to different screen sizes, ensuring a good user experience on both desktop and mobile devices.
* The navbar will have smooth animations and transitions to enhance UX and make it visually appealing.
* The Nav component will be used in the main App component to provide navigation throughout the website/app.
* The Nav component will be designed to be reusable and modular, allowing for easy maintenance and scalability as the website/app grows and evolves.
* The Nav component will be tested to ensure that all links and routes are functioning correctly and that the navigation experience is smooth and intuitive for users.
* The Nav component is an essential piece of the website/app because it helps & allows users to navigate through the different sections of the website/app, so everyhting MUST function properly and be user-friendly to ensure a positive user experience.
* User will have the option to customize the navbar to their liking: different themes, colors, fonts, etc to match their preference or style. 
* Users will also have the option to add or remove links from the navbar based on their needs and preferences, allowing for a personalized navigation experience.
* User will also have the option to hide or show the navbar based on their preference, allowing for a more immersive experience when needed.
* The navbar will also include a search bar for users to quickly find specific content on the website/app, enhancing the overall user experience and making it easier for users to navigate through the website/app.
* The navbar will also include a dropdown menu for users to access additional options or features, such as account settings, notifications, etc, providing a more comprehensive navigation experience for users.
* The navbar will also include a hamburger menu for mobile device, allowing for a more compact and user-friendly navigation experience on smaller screens.
* Users will also have the option to have the navbar fixed at the top of the page, allowing for easy access to navigation links as they scroll through the content of the website/app.
*/