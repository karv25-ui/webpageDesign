import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaImage, FaTimes } from 'react-icons/fa';
import './Home.css';

function getStamp(date) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const day = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${day} · ${mm}.${dd}.${yy}`;
}

const THEME_KEY = 'km-home-theme';
// This one is a personal, per-browser preview only — see BACKGROUND_KEY
// usage below and the note in the picker UI itself.
const BACKGROUND_KEY = 'km-home-background';

// ---- Site-wide background (shows to every visitor) ----
// The "for real, for everyone" path — same manual pattern used elsewhere
// in this app (self-portraits, founder photo). To set it:
//   1. Add your image file(s) to src/components/layout/ (or a subfolder)
//   2. Import them below: import heroBg from './hero-bg.jpg';
//   3. Set this to either:
//        { mode: 'single', images: [heroBg] }
//        { mode: 'collage', images: [img1, img2, img3, img4] }
//      or leave as-is for the current themed gradient look.
// A visitor's own local upload (the in-page picker) previews on top of
// this on their device only — it never changes what other visitors see.
const HOME_BACKGROUND = { mode: 'default', images: [] };

const MAX_IMAGE_BYTES = 1 * 1024 * 1024; // 1MB per image — keeps base64'd
// storage comfortably under typical browser localStorage limits, even
// with a full 4-image collage.
const MAX_COLLAGE_IMAGES = 4;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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

function BackgroundPicker({ background, onChange, onClose }) {
  const [error, setError] = useState('');
  const panelRef = useRef(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleFiles = async (fileList, mode) => {
    setError('');
    const files = Array.from(fileList).slice(0, mode === 'collage' ? MAX_COLLAGE_IMAGES : 1);

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Please choose image files only.');
        return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setError(`"${file.name}" is too large — please use images under 1MB each.`);
        return;
      }
    }

    try {
      const dataUrls = await Promise.all(files.map(fileToDataUrl));
      const next = { mode, images: dataUrls };
      localStorage.setItem(BACKGROUND_KEY, JSON.stringify(next));
      onChange(next);
    } catch {
      setError(
        'Could not save that background — the file(s) may be too large ' +
        'for browser storage. Try a smaller image or fewer photos.'
      );
    }
  };

  const handleReset = () => {
    localStorage.removeItem(BACKGROUND_KEY);
    onChange(null);
    setError('');
  };

  return (
    <div className="bg-picker-overlay" role="presentation" onClick={onClose}>
      <div
        className="bg-picker-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bg-picker-title"
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-picker-header">
          <h2 id="bg-picker-title">Homepage Background</h2>
          <button type="button" className="bg-picker-close" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <p className="bg-picker-note">
          This preview only changes what you see on this device — it won't
          change the background for other visitors.
        </p>

        <div className="bg-picker-options">
          <label className="bg-picker-option">
            <span>Single photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files.length && handleFiles(e.target.files, 'single')}
            />
          </label>

          <label className="bg-picker-option">
            <span>Collage (up to {MAX_COLLAGE_IMAGES} photos)</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files.length && handleFiles(e.target.files, 'collage')}
            />
          </label>
        </div>

        {error && <p className="bg-picker-error" role="alert">{error}</p>}

        {background && (
          <button type="button" className="bg-picker-reset" onClick={handleReset}>
            Reset to default background
          </button>
        )}
      </div>
    </div>
  );
}

function HeroBackground({ background }) {
  if (background.mode === 'single' && background.images[0]) {
    return (
      <div
        className="hero-bg hero-bg--single"
        style={{ backgroundImage: `url(${background.images[0]})` }}
        aria-hidden="true"
      />
    );
  }

  if (background.mode === 'collage' && background.images.length > 0) {
    const cols = Math.ceil(Math.sqrt(background.images.length));
    return (
      <div
        className="hero-bg hero-bg--collage"
        style={{ '--collage-cols': cols }}
        aria-hidden="true"
      >
        {background.images.map((src, i) => (
          <div key={i} className="hero-bg-tile" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
    );
  }

  return null;
}

// ---- Updates / Recent Posts ----
const UPDATES = [
  // {
  //   date: 'September 2026',
  //   title: 'New portrait series added',
  //   blurb: 'A short line about what this update is.',
  //   media: null,
  // },
];

function UpdatesSection({ updates }) {
  return (
    <section className="updates-section">
      <h2 className="updates-heading">Updates &amp; Recent Posts</h2>
      {updates.length === 0 ? (
        <div className="updates-empty">
          New posts and announcements will show up here — add entries to
          `UPDATES` in Home.js.
        </div>
      ) : (
        <div className="updates-grid">
          {updates.map((post, i) => (
            <article className="update-card" key={i}>
              {post.media?.type === 'image' && (
                <img src={post.media.src} alt="" className="update-media" />
              )}
              <p className="update-date">{post.date}</p>
              <h3 className="update-title">{post.title}</h3>
              <p className="update-blurb">{post.blurb}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Home() {
  const [now, setNow] = useState(new Date());
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'dark');
  const [background, setBackground] = useState(() => {
    try {
      const stored = localStorage.getItem(BACKGROUND_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerTriggerRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const closePicker = () => {
    setPickerOpen(false);
    pickerTriggerRef.current?.focus();
  };

  // Local override wins if present; otherwise falls back to the site-wide
  // config above. Whichever is active is what actually renders, and what
  // decides whether the contrast scrim kicks in.
  const resolvedBackground = background || HOME_BACKGROUND;
  const hasCustomBackground =
    resolvedBackground.mode !== 'default' && resolvedBackground.images.length > 0;

  return (
    <div className="homepage" data-theme={theme}>
      <section className={`homepage-hero ${hasCustomBackground ? 'homepage-hero--custom-bg' : ''}`}>
        <HeroBackground background={resolvedBackground} />
        <div className="hero-scrim" aria-hidden="true" />

        <div className="homepage-grain" aria-hidden="true" />

        <span className="frame-corner frame-corner--tl" aria-hidden="true" />
        <span className="frame-corner frame-corner--tr" aria-hidden="true" />
        <span className="frame-corner frame-corner--bl" aria-hidden="true" />
        <span className="frame-corner frame-corner--br" aria-hidden="true" />

        <div className="film-stamp">{getStamp(now)}</div>

        <div className="hero-controls">
          <button
            type="button"
            className="bg-picker-trigger"
            ref={pickerTriggerRef}
            onClick={() => setPickerOpen(true)}
            aria-haspopup="dialog"
            aria-label="Change homepage background"
          >
            <FaImage />
          </button>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="homepage-content">
          <h1 className="homepage-title">
            Welcome to <em>Kaptured Moment</em>
          </h1>
          <p className="homepage-description">
            Discover the art of photography and capture your special moments.
          </p>
          <Link to="/portfolio" className="kaptured-button">
            <span className="kaptured-button-ring" aria-hidden="true" />
            Explore My Portfolio
          </Link>
        </div>
      </section>

      <UpdatesSection updates={UPDATES} />

      {pickerOpen && (
        <BackgroundPicker
          background={background}
          onChange={setBackground}
          onClose={closePicker}
        />
      )}
    </div>
  );
}

export default Home;

/* This is the Home component for the Kaptured Moment website/app.
It is the landing page that welcomes the users to the website/app and encourages them to explore the portfolio of photographs.
* The component consists of a greeting message: Depending on the time of day, it will display "Good Morning", "Good Afternoon", or "Good Evening" followed by the day of the week and "Welcome to Kaptured Moment".
* A brief description: It provides a short description of what the website/app is about, which is to discover the art of photography and capture special moments.
* A "Kaptured" button: This button encourages users to click and explore the portfolio of photographs available on the website/app. It can be linked to a gallery or portfolio page where users can view the photographs.
* Clients will have the option to customize the homepage to their likinig: themes, colors, fonts, transistions, etc to match their prefrence.
* There will be a client-side where the interface will be user-friendly and easy to navigate, allowing clients to easily access the different sections of the website/app and find the information they need. This will be all vistiors & clients landing on the website/app.
* There will be an admin-side where the interface will be for the admin only! It will allow the admin to easily manage the content of the website/app, including adding new photographs, updating existing content, and moderating user submissions.
* The homepage will be designed to be visually appealing and consistent with the overall design of the website/app, creating a welcoming and engaging experience for users. It will also be optimized for different devices and screen sizes, ensuring that it looks great and functions well on desktops, tablets, and mobile devices.

* THERE SHOULD BE A COUPLE OF DIFFERENT THEMES FOR THE HOMEPAGE, INCLUDING A LIGHT AND DARK MODE, TO PROVIDE USERS WITH OPTIONS FOR PERSONALIZING THEIR EXPERIENCE.
 THEME SELECTION WILL BE AVAILABLE IN THE CLIENT-SIDE INTERFACE, ALLOWING USERS TO SWITCH BETWEEN THEMES EASILY.
* FOR THE HOME PAGE, IT SHOULD CONSIST OF UPDATES, ANNOUNCEMENTS, INFORMATION ABOUT THE WEBSITE/APP, AND ANY OTHER RELEVANT CONTENT THAT THE ADMIN WANTS TO SHARE WITH USERS. THIS WILL HELP KEEP USERS INFORMED AND ENGAGED WITH THE WEBSITE/APP.
* THERE SHOULD BE A SECTION FOR RECENT POSTS ON THE HOMEPAGE, WHERE USERS CAN SEE THE LATEST CONTENT ADDED TO THE WEBSITE/APP. THIS WILL HELP KEEP USERS ENGAGED AND ENCOURAGE THEM TO RETURN TO THE WEBSITE/APP REGULARLY.
* THE UPDATES, ANNOUCEMENTS, NEWS, INFORMATION, AND RECENT POST SHOULD BE EASILY ACCESSIBLE AND VISIBLE ON THE HOMEPAGE, ALLOWING USERS TO QUICKLY FIND THE INFORMATION THEY NEED WITHOUT HAVING TO NAVIGATE THROUGH MULTIPLE PAGES.
* THESE SHOULD BE SHOWCASED IN A VISUALLY APPEALING WAY, USING IMAGES, VIDEOS, OR OTHER MEDIA TO MAKE THE CONTENT MORE ENGAGING AND INTERESTING FOR USERS.
* ALLOW THIS TO CAPTIVATE THE USERS ATTENTION AND ENCOURAGE THEM TO EXPLORE MORE.

 * i want to be able tp upload a picture if I would like in the background of the hompeage. Or it can be a collage. I want to be able to choose from either or seamlessly and effortlessly. Make this acccessible.
 */