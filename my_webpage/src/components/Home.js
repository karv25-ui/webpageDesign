import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function getGreeting(date) {
  const hour = date.getHours();
  if (hour < 12) return 'Good Morning!';
  if (hour < 18) return 'Good Afternoon!';
  return 'Good Evening!';
}

function getStamp(date) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const day = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  return `${day} · ${mm}.${dd}.${yy}`;
}

function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-grain" aria-hidden="true" />

      <span className="frame-corner frame-corner--tl" aria-hidden="true" />
      <span className="frame-corner frame-corner--tr" aria-hidden="true" />
      <span className="frame-corner frame-corner--bl" aria-hidden="true" />
      <span className="frame-corner frame-corner--br" aria-hidden="true" />

      <div className="film-stamp">{getStamp(now)}</div>

      <div className="homepage-content">
        <p className="homepage-eyebrow">{getGreeting(now)}</p>
        <h1 className="homepage-title">
          Welcome to <em>Kaptured Moment</em>
        </h1>
        <p className="homepage-description">
            
        </p>
        <Link to="/portfolio" className="kaptured-button">
          <span className="kaptured-button-ring" aria-hidden="true" />
          Explore My Portfolio
        </Link>
      </div>
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
*/