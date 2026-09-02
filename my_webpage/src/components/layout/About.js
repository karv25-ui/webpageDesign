/* This is the About component for the website/app
 
* This component will show information about Kaptured Moment.
* The About component  will provide users with a breif summary/story of Kaptured Moment, including its mission, values, and background information about the founder or team behind the brand.
* The About component will also include an image section that showcases the founder of Kaptured Moment, along with a breif description of their background and expertise in photography. This will help the users understand Kaptured Moment's story behind the lens.
* The About component will also include a section that highlights all of my different links to my social media accounts & platforms. 
* See if you can use an api to pull in my social media links and display them dynamically on the About page. 
This will help users easily find and connect with Kaptured Moment on different platforms.
* See if you can use an api to pull my self-portraits from different acounts and showcase them on the About page. (Ex. Pinterest, Instagram, etc.)
* I want to have the option between using apis to pull in my photos or to manually upload them to the page. 
This will give me flexibility in how I want to showcase my work and allow me to have more control over the content that is displayed on the About page.
* This page is dedicated to showcasing my self-portraits & providing users with a deeper understanding of my work & story behind Kaptured Moment. It will help users connect with me on a more personal level and understand the inspiration behind my photography.
* 

(I'm a bit conflicted on whether if I want to have my self-portraits on the About page or not. 
I want to showcase them on the Portfolio page, but I also want to have the option to showcase them on the About page as well. 
I want to have the flexibility to choose which photos I want to showcase on each page, and I want to make sure that the photos are displayed in a way that is visually appealing and engaging for the users.)

----------------------->

# See 'const FOUNDER_BIO'
* Thinking about making the achievements section a seperate component.
* Maybe thinking about adding another page to the website dedicated to showcasing my achievements. #DONE

* In the accomplsihments section, I want to put a hyperlink for the magazine accolade that I have been featured in. 
I want to make sure that users can easily access the magazine & read the article that I was featured in. 
* I just might add a hyperlink to all of the accomplishments that I have listed in the section. #DONE

*/

import './About.css';
import SOCIAL_LINKS from './socialLinks.js';

// ---- Founder bio ----
// TODO: swap in your real photo. Intentionally left as a placeholder box
// (not an <img> import) so this file compiles cleanly even before the
// image exists — add the file to src/components/ and see the comment
// below for the one-line swap.
const FOUNDER_BIO = {
  titles:
    'Self-Taught Photographer/Videographer | Aspiring Developer | Creative/Production Director',
  text:
    'A passion for capturing moments that tell a story. This passion has led to creating moments and expressing emotions through the lens and the creative thoughts from both a personal and professional perspective. Strive to create images, videos, and moments that evoke emotions to leave a lasting impression on the viewer.',
};

const ACCOMPLISHMENTS = {
  title: 'Accomplishments',
  items: [
    'Featured in local magazines and publications for photography work (10011 Mag, GMARO Mag, etc.)',
    'Press and coverage for Mayor Wu and Maura Healy campaign/inauguration event',
    '500+ sessions shot since 2020, including weddings, portraits & events',
    'Certificate in Software Engineering & Developing from IBM (2025-2026)',
    'Certificate in Front-End Web Development from IBM (2025-2026)',
    'Certificate in React Development from IBM (2025-2026)',
    'Certificate in Cloud Computing from IBM (2025-2026)',
  ]
};
// ---- Social links ----
// Static data — your own URLs. No API needed for this; just keep this
// list updated when a handle or platform changes.
/*const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com/kaptured.moment' },
  { label: 'Pinterest', url: 'https://pinterest.com/kapturedmoment' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@kaptured.moment' },
  { label: 'YouTube', url: 'https://youtube.com/@kaptured.moment' },
];*/

/* 
cat > src/components/layout/socialLinks.js << 'EOF'
// Shared across About.js and Contact.js — update a handle here once,
// not in two places.
const SOCIAL_LINKS = [
   { label: 'Instagram', url: 'https://instagram.com/kaptured.moment' },
  { label: 'Pinterest', url: 'https://pinterest.com/kapturedmoment' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@kaptured.moment' },
  { label: 'YouTube', url: 'https://youtube.com/@kaptured.moment' },
];

export default SOCIAL_LINKS;
EOF
*/

// ---- Self-portraits: manual source (works today) ----
// Add real photos like:
//   import portrait1 from './portraits/portrait1.jpg';
// then: { src: portrait1, alt: 'Description for screen readers' }
const SELF_PORTRAITS_MANUAL = [
  // { src: portrait1, alt: '...' },
];

// ---- Self-portraits: API source (future — NOT functional yet) ----
// Real Instagram/Pinterest photo pulling needs, in order:
//   1. Your account converted to Instagram Business/Creator (or Pinterest
//      Business), linked as required by each platform
//   2. A registered developer app + Meta/Pinterest app review approval
//   3. A small serverless function (e.g. a Vercel/Netlify function) that
//      holds the access token server-side and returns just the photo URLs
//      to this component — the token itself must never ship in this
//      React bundle, since anything here is visible in the browser.
// This function is a stub showing the intended shape — swap the body
// once the serverless endpoint above actually exists.
async function fetchSelfPortraitsFromApi() {
  throw new Error(
    'API photo source not yet configured — see comments in About.js'
  );
}

// Flip this once the API path above is real: 'manual' | 'api'
const PHOTO_SOURCE = 'manual';

function SocialLinks() {
  return (
    <ul className="social-links">
      {SOCIAL_LINKS.map(({ label, url, Icon }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Icon className="social-icon" aria-hidden="true" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

// Reusable so Portfolio.js can render the exact same gallery later with a
// different (or the same) photo array and limit — resolves the "About vs.
// Portfolio" question by making it a per-page prop, not a permanent choice.
function SelfPortraitGallery({ photos, limit }) {
  const shown = limit ? photos.slice(0, limit) : photos;

  if (shown.length === 0) {
    return (
      <div className="portrait-empty">
        Self-portraits coming soon — add images to `SELF_PORTRAITS_MANUAL`
        in About.js.
      </div>
    );
  }

  return (
    <div className="portrait-grid">
      {shown.map((photo, i) => (
        <img
          key={i}
          src={photo.src}
          alt={photo.alt}
          className="portrait-grid-img"
        />
      ))}
    </div>
  );
}

function About() {
  const photos = PHOTO_SOURCE === 'manual' ? SELF_PORTRAITS_MANUAL : [];

  return (
    <div className="about">
      <section className="about-intro">
        <p className="about-eyebrow">The Story Behind the Lens</p>
        <h1 className="about-title">About Kaptured Moment</h1>
        <p className="about-mission">
         To capture is to preserve a moment in time through image, sound & quality. 
          Kaptured Moment represents the essence of a picture worth more than a thousand words!
        </p>
      </section>

      <section className="about-founder">
        <div className="founder-photo-placeholder" aria-hidden="true">
          Add founder-photo.jpg
        </div>
        <div className="founder-bio">
          <h2 className="about-subheading">Behind the Camera</h2>
          <h3 className="founder-titles">{FOUNDER_BIO.titles}</h3>
          <p>{FOUNDER_BIO.text}</p>
          {ACCOMPLISHMENTS.items.length > 0 && (
            <div className="founder-accomplishments">
              <h3>{ACCOMPLISHMENTS.title}</h3>
              <ul className="accomplishments-list">
                {ACCOMPLISHMENTS.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="about-portraits">
        <h2 className="about-subheading">Self-Portraits</h2>
        <SelfPortraitGallery photos={photos} limit={4} />
        <a href="/portfolio" className="portrait-more-link">
          See more on the Portfolio page
        </a>
      </section>

      <section className="about-social">
        <h2 className="about-subheading">Find Me Online!</h2>
        <SocialLinks />
      </section>
    </div>
  );
}

export default About;
export { SelfPortraitGallery };