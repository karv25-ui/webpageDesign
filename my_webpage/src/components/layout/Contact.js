/* This is the Contact component for the website/app
* This will be a section that allows users to get in touch with Kaptured Moment for inquiries, bookings, or general questions.

# Contact Form
* The form will include fields for name, email, service of interest & a message box for users to provide additional details or questions.
* The form will also include date & time fields for users to determine what time & day they would like to book a sessions or inquire. 
* There will be a submit button that send information to Kaptured Moment's email or a backend system for processing.
* The form will have validation to ensure that all required fields are filled out correctly before submission.
* After submission, user will recieve a confirmation message via text on the page or text message/email confirming that their inquiry has been received and will be responded to within a certain timeframe.
* Additionally, there will be contact information provided such as phone number, email address, and social media links for users who prefer to reach out through those channels.
* There will be 2 sections: Inquiry Form & Book Now Form.
Inquiry Form : 
* This section will be for users who have questions about services, pricing, or general inquiries.
* For users who are interested/unclear about services but would like to book a session.
* The form will include fields for name, email, service of interest & a message box for users to provide additional details or questions.
* The form will also include date & time fields for users to determine what time & day they would like to book a sessions or inquire. 
* There will be a submit button that send information to Kaptured Moment's email or a backend system for processing.
* The form will have validation to ensure that all required fields are filled out correctly before submission.
* After submission, user will recieve a confirmation message via text on the page or text message/email confirming that their inquiry has been received and will be responded to within a certain timeframe.

Book Now Form:
* This section will be for users who are ready to book a session and want to provide specific details about their booking.
* Users know exactly what service they want and are ready to book a session ASAP.
* The form will in include fields for name, email, service of interest & a message box for users to provide additional details or questions.
* The form will also include date & time fields for users to determine what time & day they would like to book a sessions or inquire. 
* The form will also include a field for users to specify the type of service they are interested in (e.g., portrait, event coverage, commercial, etc.) to help Kaptured Moment better understand their needs and preferences.
* There will be a submit button that send information to Kaptured Moment's email or a backend system for processing.
* The form will have validation to ensure that all required fields are filled out correctly before submission.
* After submission, user will recieve a confirmation message via text on the page or text message/email confirming that their booking inquiry has been received and will be responded to within a certain timeframe.

General Questions Form/Section:
* This section will be for users who have general questions about Kaptured Moment's services, pricing, or availability.
* The form will include fields for name, email, and a message box for users to provide their questions or inquiries.
* There will be a submit button that send information to Kaptured Moment's email or a backend system for processing.
* The form will have validation to ensure that all required fields are filled out correctly before submission.
* After submission, user will recieve a confirmation message via text on the page or text message/email confirming that their inquiry or question has been received and will be responded to within a certain timeframe.

* This Contact component will be designed to be user-friendly and visually appealing, with clear instructions and a simple layout to encourage users to reach out and book their sessions with Kaptured Moment.
* Minimal design with functionality as the main focus. Clean, simple, and easy to navigate. The goal is to make it as easy as possible for users to get in touch with Kaptured Moment and book their sessions without any confusion or frustration.
* Steps by step instructions on how to fill out 

-------------------------------->

* NEED TO ADD PREFERENCE FOR CONTACT METHOD (EMAIL, PHONE, TEXT) & TIME OF DAY FOR CONTACT (MORNING, AFTERNOON, EVENING).
THERE NEEDS TO BE A DROP DOWN OPTION FOR PREFERRED CONTACT METHOD & TIME OF DAY FOR CONTACT. #DONE

* WAS THINKING ABPUT ADDING AN ANIMATION AFTER A POTENTIAL CLIENT SUBMITS A FORM. (EX. A CHECK MARK ANIMATION OR A "THANK YOU" ANIMATION AFTER SUBMISSION) #DONE

* I WAS THINKING ABOUT ADDING LIKE A POLICY OR TERMS OF SERVICE SECTION TO THE CONTACT PAGE. (EX. CANCELLATION POLICY, REFUND POLICY, ETC.)
MAYBE LIKE A POP UP PAGE FOR USERS TO READ THE TERMS OF SERVICE OR POLICIES BEFORE SUBMITTING A FORM. 
THIS IS A REQUIRED FIELD IN THE FORM THAT USERS MUST AGREE TO BEFORE SUBMITTING.
USERS HAVE THE OPTION WHEN READING THE TERMS OF SERVICE OR POLICIES TO AGREE OR DISAGREE. IF THEY DISAGREE, THEY CANNOT SUBMIT THE FORM.
USERS HAVE THE OPTION WHEN READING THE TERMS OF SERVICE OR POLICIES TO HIT A SCROLL TO BOTTOM BUTTON TO REACH THE BOTTOM OF THE PAGE. ONCE THEY REACH THE BOTTOM OF THE PAGE, THEY WILL HAVE THE OPTION TO AGREE OR DISAGREE. IF THEY DISAGREE, THEY CANNOT SUBMIT THE FORM.
USERS CANNOT AGREE OR DISAGREE WITHOUT READING THE TERMS OF SERVICE OR POLICIES. THEY MUST SCROLL TO THE BOTTOM OF THE PAGE TO AGREE OR DISAGREE. IF THEY DISAGREE, THEY CANNOT SUBMIT THE FORM.
USERS CANNOT LEAVE THE TERMS OF SERVICE OR POLICIES PAGE WITHOUT AGREEING OR DISAGREEING. IF THEY DISAGREE, THEY CANNOT SUBMIT THE FORM.
THIS IS A REQUIRED FIELD IN THE FORM THAT IS BELOW THE MESSAGE BOX AND ABOVE THE SEND INQUIRY OR REQUEST BOOKING BUTTON.
I WILL HAVE MY OWN TERMS OF SERVICE OR POLICIES THAT I WILL PROVIDE. I WILL PROVIDE WITH THE TERMS OF SERVICE OR POLICIES IN A SEPARATE DOCUMENT. (SUGGESTIONS ON WHAT TO INCLUDE IN THE TERMS OF SERVICE OR POLICIES ARE WELCOME) #DONE

* I WANT TO MAKE SURE THAT THE CONTACT FORM IS RESPONSIVE AND WORKS WELL ON MOBILE DEVICES. 

*/

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SOCIAL_LINKS from './socialLinks';
import './Contact.css';

const SERVICES = [
  'Portrait Session',
  'Event Coverage',
  'Wedding',
  'Commercial',
  'Not sure yet — just want to inquire',
];

const CONTACT_METHODS = ['Email', 'Phone', 'Text', 'No Preference'];
const CONTACT_TIMES = ['Morning', 'Afternoon', 'Evening', 'No Preference'];

// ---- Email delivery ----
// Uses EmailJS (@emailjs/browser) — works without a backend server.
// Setup (a few minutes, not the weeks-long review the social APIs need):
//   1. npm install @emailjs/browser
//   2. Free account at emailjs.com → connect an email service (Gmail,
//      Outlook, etc.) → create a template with variables matching the
//      field `name` attributes below: {{name}} {{email}} {{phone}}
//      {{contactMethod}} {{contactTimeOfDay}} {{service}} {{date}}
//      {{time}} {{message}} {{termsAgreement}}
//   3. Add a .env file in your project root (CRA requires the
//      REACT_APP_ prefix):
//        REACT_APP_EMAILJS_SERVICE_ID=your_service_id
//        REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
//        REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
//   4. Restart npm start after adding it — CRA only reads .env on startup.
// Until those env vars are set, submissions fail gracefully into the
// error state below rather than silently doing nothing.
function sendContactEmail(formEl) {
  return emailjs.sendForm(
    process.env.REACT_APP_EMAILJS_SERVICE_ID,
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    formEl,
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  );
}

function validate(values, requireBookingFields, termsStatus) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  if (!values.contactMethod) errors.contactMethod = 'Please select a preferred contact method.';
  if (!values.contactTimeOfDay) errors.contactTimeOfDay = 'Please select a preferred time of day.';
  if (!values.message.trim()) errors.message = 'Please add a short message.';

  if (requireBookingFields) {
    if (!values.service) errors.service = 'Please select a service.';
    if (!values.date) errors.date = 'Please choose a date.';
  }

  if (termsStatus !== 'agreed') {
    errors.terms = 'You must read and agree to the Terms of Service & Policies to submit.';
  }

  return errors;
}

// Animated checkmark shown after a successful submission.
function SuccessCheck() {
  return (
    <svg className="success-check" viewBox="0 0 52 52" aria-hidden="true">
      <circle className="success-check-circle" cx="26" cy="26" r="24" fill="none" />
      <path className="success-check-mark" fill="none" d="M14 27l7 7 16-16" />
    </svg>
  );
}

// ---- Terms of Service / Policies modal ----
// Placeholder text below — swap in your real policies whenever you send
// them over. Suggestions for what to cover: cancellation window & any fee,
// refund/no-refund conditions, rescheduling policy, late-arrival policy,
// image usage & model release (can you use client photos in your
// portfolio/marketing), payment terms & deposit requirements, weather/
// outdoor-shoot contingency, and turnaround time for delivered photos.
function TermsModal({ open, onAgree, onDisagree, onRequestClose, triggerRef }) {
  const contentRef = useRef(null);
  const modalRef = useRef(null);
  const [canDecide, setCanDecide] = useState(false);

  // Reset the scroll-gate each time the modal is freshly opened.
  useEffect(() => {
    if (open) {
      setCanDecide(false);
    }
  }, [open]);

  // If the content already fits without scrolling, don't leave someone
  // stuck on a "scroll to continue" button that has nothing to scroll to.
  useEffect(() => {
    if (!open) return undefined;
    const id = requestAnimationFrame(() => {
      const el = contentRef.current;
      if (el && el.scrollHeight <= el.clientHeight + 4) {
        setCanDecide(true);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Focus into the modal on open; return focus to whatever opened it on
  // close, so keyboard users aren't dropped back at the top of the page.
  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onRequestClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onRequestClose]);

  if (!open) return null;

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) {
      setCanDecide(true);
    }
  };

  const scrollToBottom = () => {
    const el = contentRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    setCanDecide(true);
  };

  return (
    <div className="terms-overlay" role="presentation">
      <div
        className="terms-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        tabIndex={-1}
        ref={modalRef}
      >
        <h2 id="terms-title">Terms of Service &amp; Policies</h2>

        <div className="terms-content" ref={contentRef} onScroll={handleScroll}>
          {/* TODO: replace with your real policies. */}
          <p>Add your Cancellation Policy here — notice window and any fee.</p>
          <p>Add your Refund Policy here — what's refundable and under what conditions.</p>
          <p>Add your Rescheduling Policy here.</p>
          <p>Add your Image Usage / Model Release terms here.</p>
          <p>Add your Payment Terms & deposit requirements here.</p>
          <p>Add any Weather / Outdoor Shoot contingency terms here.</p>
          <p style={{ marginTop: '1.5rem' }}>
            * End of policies. You must reach this line before you can agree
            or disagree. *
          </p>
        </div>

        {!canDecide && (
          <button type="button" className="terms-scroll-btn" onClick={scrollToBottom}>
            Scroll to bottom to continue
          </button>
        )}

        <div className="terms-actions">
          <button type="button" className="terms-disagree" onClick={onDisagree} disabled={!canDecide}>
            Disagree
          </button>
          <button type="button" className="terms-agree" onClick={onAgree} disabled={!canDecide}>
            I Agree
          </button>
        </div>
        {!canDecide && <p className="terms-hint">Please read to the end to continue.</p>}
      </div>
    </div>
  );
}

const EMPTY_VALUES = {
  name: '', email: '', phone: '', contactMethod: '', contactTimeOfDay: '',
  service: '', date: '', time: '', message: '',
};

function ContactForm({ variant }) {
  const isBooking = variant === 'book';
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [termsStatus, setTermsStatus] = useState('unread'); // unread | agreed | disagreed
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const termsTriggerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values, isBooking, termsStatus);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      await sendContactEmail(e.target);
      setStatus('success');
      setValues(EMPTY_VALUES);
      setTermsStatus('unread');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <p className="form-instructions">
        {isBooking
          ? "Fill in your details below and we'll confirm your session."
          : "Have a question or not sure what you need yet? Send a quick message and I'll get back to you!"}
      </p>

      <div className="form-field">
        <label htmlFor={`${variant}-name`}>Name</label>
        <input
          id={`${variant}-name`}
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${variant}-name-error` : undefined}
        />
        {errors.name && (
          <span id={`${variant}-name-error`} className="form-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor={`${variant}-email`}>Email</label>
        <input
          id={`${variant}-email`}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${variant}-email-error` : undefined}
        />
        {errors.email && (
          <span id={`${variant}-email-error`} className="form-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor={`${variant}-phone`}>Phone</label>
        <input
          id={`${variant}-phone`}
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${variant}-phone-error` : undefined}
        />
        {errors.phone && (
          <span id={`${variant}-phone-error`} className="form-error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${variant}-contactMethod`}>Preferred contact method</label>
          <select
            id={`${variant}-contactMethod`}
            name="contactMethod"
            value={values.contactMethod}
            onChange={handleChange}
            aria-invalid={!!errors.contactMethod}
          >
            <option value="">Select…</option>
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errors.contactMethod && (
            <span className="form-error" role="alert">{errors.contactMethod}</span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor={`${variant}-contactTimeOfDay`}>Best time of day to reach you</label>
          <select
            id={`${variant}-contactTimeOfDay`}
            name="contactTimeOfDay"
            value={values.contactTimeOfDay}
            onChange={handleChange}
            aria-invalid={!!errors.contactTimeOfDay}
          >
            <option value="">Select…</option>
            {CONTACT_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.contactTimeOfDay && (
            <span className="form-error" role="alert">{errors.contactTimeOfDay}</span>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${variant}-service`}>
          Service of interest {!isBooking && '(optional)'}
        </label>
        <select
          id={`${variant}-service`}
          name="service"
          value={values.service}
          onChange={handleChange}
          aria-invalid={!!errors.service}
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <span className="form-error" role="alert">{errors.service}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${variant}-date`}>
            Date {!isBooking && '(optional)'}
          </label>
          <input
            id={`${variant}-date`}
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            aria-invalid={!!errors.date}
          />
          {errors.date && <span className="form-error" role="alert">{errors.date}</span>}
        </div>
        <div className="form-field">
          <label htmlFor={`${variant}-time`}>Preferred time (optional)</label>
          <input
            id={`${variant}-time`}
            name="time"
            type="time"
            value={values.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${variant}-message`}>Message</label>
        <textarea
          id={`${variant}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${variant}-message-error` : undefined}
        />
        {errors.message && (
          <span id={`${variant}-message-error`} className="form-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <div className="form-field form-field--terms">
        <div className="terms-field-row">
          <span className="terms-status-label">
            {termsStatus === 'agreed' && '✓ You agreed to the Terms of Service & Policies'}
            {termsStatus === 'disagreed' && 'You disagreed — you must agree to the terms to submit'}
            {termsStatus === 'unread' && 'You must read and agree to the Terms of Service & Policies before submitting'}
          </span>
          <button
            type="button"
            className="terms-link-btn"
            ref={termsTriggerRef}
            onClick={() => setTermsModalOpen(true)}
          >
            {termsStatus === 'unread' ? 'Read Terms & Policies' : 'Review Terms & Policies'}
          </button>
        </div>
        <input type="hidden" name="termsAgreement" value={termsStatus} />
        {errors.terms && <span className="form-error" role="alert">{errors.terms}</span>}
      </div>

      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : isBooking ? 'Request Booking' : 'Send Inquiry'}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <div className="form-status form-status--success">
            <SuccessCheck />
            <p className="success-thanks">Thank you!</p>
            <p>
              Your message has been sent! I'll respond within 1 to 2 business days,
              or at the earliest convenience. If you don't hear back, please reach
              out directly via email or phone.
            </p>
          </div>
        )}
        {status === 'error' && (
          <p className="form-status form-status--error">
            Something went wrong sending your message. Email setup may still be pending —
            see the comments at the top of your Contact form — or reach out directly below.
          </p>
        )}
      </div>

      <TermsModal
        open={termsModalOpen}
        triggerRef={termsTriggerRef}
        onAgree={() => {
          setTermsStatus('agreed');
          setTermsModalOpen(false);
        }}
        onDisagree={() => {
          setTermsStatus('disagreed');
          setTermsModalOpen(false);
        }}
        onRequestClose={() => setTermsModalOpen(false)}
      />
    </form>
  );
}

function Contact() {
  const [activeTab, setActiveTab] = useState('inquiry');

  return (
    <div className="contact">
      <section className="contact-intro">
        <p className="contact-eyebrow">Let's Connect</p>
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          Whether you have a question or you're ready to book a session,
          pick the option below that fits.
        </p>
      </section>

      <div className="contact-tabs" role="tablist" aria-label="Contact options">
        <button
          type="button"
          role="tab"
          id="tab-inquiry"
          aria-selected={activeTab === 'inquiry'}
          aria-controls="panel-inquiry"
          className={`contact-tab ${activeTab === 'inquiry' ? 'contact-tab--active' : ''}`}
          onClick={() => setActiveTab('inquiry')}
        >
          Inquiry
        </button>
        <button
          type="button"
          role="tab"
          id="tab-book"
          aria-selected={activeTab === 'book'}
          aria-controls="panel-book"
          className={`contact-tab ${activeTab === 'book' ? 'contact-tab--active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book Now
        </button>
      </div>

      <div id="panel-inquiry" role="tabpanel" aria-labelledby="tab-inquiry" hidden={activeTab !== 'inquiry'}>
        {activeTab === 'inquiry' && <ContactForm variant="inquiry" />}
      </div>
      <div id="panel-book" role="tabpanel" aria-labelledby="tab-book" hidden={activeTab !== 'book'}>
        {activeTab === 'book' && <ContactForm variant="book" />}
      </div>

      <section className="contact-direct">
        <h2 className="contact-subheading">Prefer to reach out directly?</h2>
        <ul className="contact-info-list">
          <li>Email: <a href="mailto:kaptured.moment@gmail.com">kaptured.moment@gmail.com</a></li>
          <li>Phone: <a href="tel:+18574230332">+1 (857) 423-0332</a></li>
        </ul>
        <ul className="social-links">
          {SOCIAL_LINKS.map(({ label, url, Icon }) => (
            <li key={label}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="social-link">
                <Icon className="social-icon" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export { SOCIAL_LINKS };
export default Contact;