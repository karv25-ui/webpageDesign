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

*/

import { useState } from 'react';
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

// ---- Email delivery ----
// Uses EmailJS (@emailjs/browser) — works without a backend server.
// Setup (a few minutes, not the weeks-long review the social APIs need):
//   1. npm install @emailjs/browser
//   2. Free account at emailjs.com → connect an email service (Gmail,
//      Outlook, etc.) → create a template with variables matching the
//      field `name` attributes below: {{name}} {{email}} {{service}}
//      {{date}} {{time}} {{message}}
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

function validate(values, requireBookingFields) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.message.trim()) errors.message = 'Please add a short message.';

  if (requireBookingFields) {
    if (!values.service) errors.service = 'Please select a service.';
    if (!values.date) errors.date = 'Please choose a date.';
  }

  return errors;
}

function ContactForm({ variant }) {
  const isBooking = variant === 'book';
  const [values, setValues] = useState({
    name: '', email: '', service: '', date: '', time: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values, isBooking);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      await sendContactEmail(e.target);
      setStatus('success');
      setValues({ name: '', email: '', service: '', date: '', time: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <p className="form-instructions">
        {isBooking
          ? "Fill in your details below and we'll confirm your session."
          : "Have a question or not sure what you need yet? Send a quick message and we'll get back to you."}
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

      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : isBooking ? 'Request Booking' : 'Send Inquiry'}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="form-status form-status--success">
            Thanks — your message has been sent. We'll respond within 1–2 business days.
          </p>
        )}
        {status === 'error' && (
          <p className="form-status form-status--error">
            Something went wrong sending your message. Email setup may still be pending —
            see the comments at the top of Contact.js — or reach out directly below.
          </p>
        )}
      </div>
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
          <li>Phone: <a href="tel:+1 (857) 423-0332">+1 (857) 423-0332</a></li>
        </ul>
        <ul className="social-links">
          {SOCIAL_LINKS.map(({ label, url }) => (
            <li key={label}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="social-link">
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