import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.css';

// ---- Your own video interviews (you record these) ----
// Easiest hosting: upload to YouTube as "Unlisted" and paste the video ID
// (the part after v= in the URL). Self-hosted files also work, but large
// video files bloat your site — import one like we've done for images and
// use media: { src: importedVideo, captions: importedVttFile }.
const CLIENT_INTERVIEWS = [
  // {
  //   name: 'Client name',
  //   service: 'Wedding',
  //   question: 'What was it like working with Kaptured Moment?',
  //   media: { youtubeId: 'YOUR_VIDEO_ID', title: 'Interview with Client name' },
  // },
];

// ---- Approved testimonials — add each one after you've reviewed it ----
// type: 'text' | 'photo' | 'video' | 'audio'
// rating is optional (1-5). Photos need media.alt (describe the image for
// screen readers). Video: { youtubeId } or { src, captions }. Audio: { src }.
const TESTIMONIALS = [
  // {
  //   type: 'text',
  //   name: 'Client name',
  //   service: 'Portrait Session',
  //   rating: 5,
  //   quote: 'What they said.',
  // },
];

const VIEWS = [
  { id: 'grid', label: 'Grid' },
  { id: 'list', label: 'List' },
  { id: 'carousel', label: 'Carousel' },
];

// ---- Submission delivery ----
// Same EmailJS account/service as the Contact form, but its own template.
// 1. In EmailJS, create a second template with variables:
//    {{name}} {{displayName}} {{displayChoice}} {{service}} {{rating}}
//    {{message}} {{consent}}
//    ({{displayName}} is what to put on the page: the client's name, or
//    "Anonymous Client". {{name}} is the private name, possibly blank.)
// 2. Add to .env:  REACT_APP_EMAILJS_TESTIMONIAL_TEMPLATE_ID=your_template_id
// 3. Restart npm start.
function sendTestimonialEmail(formEl) {
  return emailjs.sendForm(
    process.env.REACT_APP_EMAILJS_SERVICE_ID,
    process.env.REACT_APP_EMAILJS_TESTIMONIAL_TEMPLATE_ID,
    formEl,
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  );
}

function Stars({ rating }) {
  return (
    <div className="t-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar key={n} className={n <= rating ? 't-star t-star--on' : 't-star'} aria-hidden="true" />
      ))}
    </div>
  );
}

function Media({ type, media, name }) {
  if (!media) return null;

  if (type === 'photo' && media.src) {
    return (
      <img
        src={media.src}
        alt={media.alt || `Photo shared by ${name}`}
        className="t-media"
        loading="lazy"
      />
    );
  }

  if (type === 'video') {
    if (media.youtubeId) {
      return (
        <div className="t-video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${media.youtubeId}`}
            title={media.title || `Video testimonial from ${name}`}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }
    if (media.src) {
      return (
        <video className="t-media" controls preload="metadata">
          <source src={media.src} />
          {media.captions && (
            <track kind="captions" src={media.captions} srcLang="en" label="English" default />
          )}
        </video>
      );
    }
  }

  if (type === 'audio' && media.src) {
    return (
      <audio className="t-audio" controls preload="metadata" src={media.src}>
        Your browser doesn't support audio playback.
      </audio>
    );
  }

  return null;
}

function TestimonialCard({ item }) {
  const displayName = item.name || 'Anonymous Client';

  return (
    <article className="t-card">
      <Media type={item.type || 'video'} media={item.media} name={displayName} />
      {item.question && <p className="t-question">{item.question}</p>}
      {item.rating ? <Stars rating={item.rating} /> : null}
      {item.quote && <blockquote className="t-quote">&ldquo;{item.quote}&rdquo;</blockquote>}
      <p className="t-attrib">
        <span className="t-name">{displayName}</span>
        {item.service && <span className="t-service"> · {item.service}</span>}
      </p>
    </article>
  );
}


function TestimonialFeed({ items }) {
  const [view, setView] = useState('grid');
  const trackRef = useRef(null);

  const scrollTrack = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  const carouselProps =
    view === 'carousel'
      ? { role: 'region', 'aria-label': 'Testimonials carousel', tabIndex: 0 }
      : {};

  return (
    <>
      <div className="t-view-switch" role="group" aria-label="Choose layout">
        {VIEWS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={view === id}
            className={`t-view-btn ${view === id ? 't-view-btn--active' : ''}`}
            onClick={() => setView(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={trackRef} className={`t-feed t-feed--${view}`} {...carouselProps}>
        {items.map((item, i) => (
          <TestimonialCard item={item} key={i} />
        ))}
      </div>

      {view === 'carousel' && (
        <div className="t-carousel-controls">
          <button type="button" onClick={() => scrollTrack(-1)} aria-label="Previous testimonials">
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollTrack(1)} aria-label="Next testimonials">
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

const EMPTY_VALUES = { name: '', service: '', message: '' };

function SubmissionForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [displayChoice, setDisplayChoice] = useState('name'); // 'name' | 'anonymous'
  const [rating, setRating] = useState(0);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const isAnonymous = displayChoice === 'anonymous';
  const displayName = isAnonymous ? 'Anonymous Client' : values.name.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!isAnonymous && !values.name.trim()) {
      next.name = 'Please enter the name you want displayed, or choose anonymous.';
    }
    if (!rating) next.rating = 'Please choose a star rating.';
    if (!values.message.trim()) next.message = 'Please share a few words about your experience.';
    if (!consent) next.consent = 'Please confirm you agree to have your testimonial displayed.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    try {
      await sendTestimonialEmail(e.target);
      setStatus('success');
      setValues(EMPTY_VALUES);
      setDisplayChoice('name');
      setRating(0);
      setConsent(false);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="t-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="t-display-field">
        <legend>How should your name appear?</legend>
        <div className="t-radio-group">
          <label className="t-radio">
            <input
              type="radio"
              name="displayChoice"
              value="name"
              checked={displayChoice === 'name'}
              onChange={() => setDisplayChoice('name')}
            />
            <span>Show my name</span>
          </label>
          <label className="t-radio">
            <input
              type="radio"
              name="displayChoice"
              value="anonymous"
              checked={displayChoice === 'anonymous'}
              onChange={() => setDisplayChoice('anonymous')}
            />
            <span>Keep me anonymous</span>
          </label>
        </div>
      </fieldset>

      <div className="t-field">
        <label htmlFor="t-name">
          {isAnonymous ? 'Your name (optional)' : 'Name'}
        </label>
        <input
          id="t-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby="t-name-hint"
        />
        <span id="t-name-hint" className="t-hint">
          {isAnonymous
            ? 'Private. Only Kaptured Moment sees this, to confirm you were a client. It will never be displayed.'
            : 'This is the name shown with your testimonial.'}
        </span>
        {errors.name && <span className="t-error" role="alert">{errors.name}</span>}
      </div>

      {/* Carries the exact name to post (or "Anonymous Client") into the email. */}
      <input type="hidden" name="displayName" value={displayName} />

      <div className="t-field">
        <label htmlFor="t-service">Service you booked (optional)</label>
        <input id="t-service" name="service" type="text" value={values.service} onChange={handleChange} />
      </div>

      <fieldset className="t-rating-field">
        <legend>Your rating</legend>
        <div className="t-rating-input">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className={`t-star-label ${n <= rating ? 't-star-label--on' : ''}`}>
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="t-sr-only"
              />
              <FaStar aria-hidden="true" />
              <span className="t-sr-only">{n} {n === 1 ? 'star' : 'stars'}</span>
            </label>
          ))}
        </div>
        {errors.rating && <span className="t-error" role="alert">{errors.rating}</span>}
      </fieldset>

      <div className="t-field">
        <label htmlFor="t-message">Your experience</label>
        <textarea
          id="t-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="t-error" role="alert">{errors.message}</span>}
      </div>

      <div className="t-field">
        <label className="t-consent">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            I agree that Kaptured Moment may display my testimonial on this
            website, shown as &ldquo;{displayName || 'the name I entered'}&rdquo;.
          </span>
        </label>
        {errors.consent && <span className="t-error" role="alert">{errors.consent}</span>}
      </div>

      <button type="submit" className="t-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Submit Testimonial'}
      </button>

      <p className="t-hint">
        Want a testimonial removed later? Reach out through the Contact page.
      </p>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="t-status t-status--success">
            Thank you! Your testimonial was sent for review. Selected testimonials are added to this page.
          </p>
        )}
        {status === 'error' && (
          <p className="t-status t-status--error">
            Something went wrong sending your testimonial. Please try again, or reach out
            using the details on the Contact page.
          </p>
        )}
      </div>
    </form>
  );
}

function Testimonials() {
  return (
    <div className="testimonials">
      <section className="t-intro">
        <p className="t-eyebrow">Kind Words</p>
        <h1 className="t-title">Client Testimonials</h1>
        <p className="t-subtitle">
          A hand-selected collection of experiences from people I've had the
          privilege of working with.
        </p>
      </section>

      {CLIENT_INTERVIEWS.length > 0 && (
        <section className="t-section">
          <h2 className="t-heading">In Their Own Words</h2>
          <div className="t-feed t-feed--grid t-feed--interviews">
            {CLIENT_INTERVIEWS.map((item, i) => (
              <TestimonialCard item={{ ...item, type: 'video' }} key={i} />
            ))}
          </div>
        </section>
      )}

      <section className="t-section">
        <h2 className="t-heading">What Clients Are Saying</h2>
        {TESTIMONIALS.length === 0 ? (
          <div className="t-empty">
            Testimonials will appear here — add approved entries to
            `TESTIMONIALS` in Testimonials.js.
          </div>
        ) : (
          <TestimonialFeed items={TESTIMONIALS} />
        )}
      </section>

      <section className="t-section t-submit-section">
        <h2 className="t-heading">Share Your Experience</h2>
        <p className="t-form-intro">
          Worked with Kaptured Moment? I'd love to hear how it went. Every
          submission is reviewed before anything is posted.
        </p>
        <SubmissionForm />
      </section>
    </div>
  );
}

export default Testimonials;

/* This is the Testimonials component for the website/app.
* This component will show testimonials from client experiences with Kaptured Moment.
* Clients will be sharing their experiences with Kaptrued Moment, & how they felt about the services that was provided.
* The testimonials can be displayed in video, photo, voice recording or text format.
* The testimonials will be displayed in a visually appealing way, consistent with overall design of the website/app.
* The testimonials will be organized in a way that allows users to easily navigate through them and read or view the different testimonials.
* The testimonials can be displayed in a carousel format, allowing easy scrolling through different testimonals.
* The testimonials can be displayed in a grid format, allowing users to see more than one. 
* The testimonials can be displayed in a list format, allowing users to read through them one by one.
* Users will be given the option to leave their own testimonial, their submission can be in video, photo, voice recording or text format.
* The testimonial submission form will be easy to use and will allow users to easily submit their testimonials.
* The testimonials will be moderated to ensure that they are appropriate and relevant to the website/app.
* DONE! *

- Client Reviews/Testimonials Submission Form:
* I want clients to be able to share their experiences with Kaptured Moment in a way that is authentic and genuine, and that will help other potential clients make informed decisions about working with Kaptured Moment.
* Clients can submit their reviews/testimonials in a form that will be provided on the website/app. The form will be easy to use, self-explanatory and will allow clients to easily submit their testimonials efficiently, effortlessly and effectively. 
* In the clients reviews/testimonais submission form, clients will be able to add up to 5 stars for their rating and be able to leave a comment or breif review about their experience with Kaptured Moment. 
* In the submission form clients will be able to submit their reviews/testimonials in video, photo, voice recording or text format. 
* Clients will NOT be able to disrespect or leave negative reviews/testimonials about Kaptured Moment, as this will be moderated and removed.
* ALL reviews/testimonials submitted by clients will be moderated to ensure that they are appropriate and relevant to the website/app.
*  DONE! *

- Kaptured Moment Testimonials Interaction:
* I want users to be able to interact with the testimonials in a way that is engaging and informative, and that will help them make informed decisions about working with Kaptured Moment.
* Users will be able to view the testimonials in a visually appealing way, consistent with overall design of the website/app.
* I will be able to upload and display testimonials from clients in a way that is authentic and genuine, and that will help other potential clients make informed decisions about working with Kaptured Moment.
* I want to be able to display testimonials in a way that is visually appealing and consistent with the overall design of the website/app.
* I will have my own section to where I can upload testimonials I have taken myself from clients in video format, where I will be asking questions to clients about their experience with Kaptured Moment, and they will be able to answer in video format.
* DONE! *
*/