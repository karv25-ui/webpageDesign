import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function getStamp(date) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const day = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${day} · ${mm}.${dd}.${yy}`;
}

// ---- Homepage background — admin-controlled, visible to every visitor ----
// Edit this file, commit, redeploy — that's the only way it changes.
//   1. Add image file(s) to src/components/layout/ (or a subfolder)
//   2. Import them: import heroBg from './hero-bg.jpg';
//   3. Set mode + images below:
//        { mode: 'single', images: [heroBg] }
//        { mode: 'collage', images: [img1, img2, img3, img4] }
const HOME_BACKGROUND = { mode: 'default', images: [] };

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

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const hasCustomBackground =
    HOME_BACKGROUND.mode !== 'default' && HOME_BACKGROUND.images.length > 0;

  return (
    <div className="homepage">
      <section className={`homepage-hero ${hasCustomBackground ? 'homepage-hero--custom-bg' : ''}`}>
        <HeroBackground background={HOME_BACKGROUND} />
        <div className="hero-scrim" aria-hidden="true" />

        <div className="homepage-grain" aria-hidden="true" />

        <span className="frame-corner frame-corner--tl" aria-hidden="true" />
        <span className="frame-corner frame-corner--tr" aria-hidden="true" />
        <span className="frame-corner frame-corner--bl" aria-hidden="true" />
        <span className="frame-corner frame-corner--br" aria-hidden="true" />

        <div className="film-stamp">{getStamp(now)}</div>

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

 * The theme switch from light to dark mode should be smooth and visually appealing, with a transition effect that enhances the user experience. The transition should be subtle and not distracting, allowing users to enjoy the change in theme without feeling overwhelmed or disoriented.
 The theme should also be consistent throughout the website/app, ensuring that all pages & components follow the same design principles and color schemes. This will create a cohesive and professional look for the website/app, enhancing the overall user experience.
 * The buttons for the image upload and theme switch should NOT interfere with the main content of the homepage and should be placed in a way that is easily accessible but does not distract from the main content. 
 The buttons should be clearly labeled and easy to understand, allowing users to quickly and easily access the features they need without confusion or frustration.

 */