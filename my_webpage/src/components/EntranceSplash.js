import { useEffect, useState } from 'react';
import KapturedMoment from './KapturedMoment.png';
import './EntranceSplash.css';

const DAY_MESSAGES = {
  monday: "Start your week off with a smile! Start with the best foot forward! ❤️",
  tuesday: "Keep pushing through, you got this! You're getting closer to the weekend! 😚",
  wednesday: "Halfway there! It's HUMP DAY! Stay strong! 💪🏾",
  thursday: "You're almost there, Friday jr! One more day until the weekend! 😁",
  friday: "It's finally Friday! The weekend is here! Time to relax and enjoy! 🥳",
  saturday: "Enjoy your weekend, make the best out of it & more importantly stay blessed! 🙏🏾",
  sunday: "Enjoy your weekend, make the best out of it & more importantly stay blessed! 🙏🏾",
};

function getTimeGreeting(hours) {
  if (hours >= 6 && hours < 12) return "Good Morning";
  if (hours >= 12 && hours < 18) return "Good Afternoon";
  if (hours >= 18 && hours < 24) return "Good Evening";
  return "Good Night";
}

// Array.from (not .slice on the raw string) so emoji don't split mid-animation.
function useTypewriter(text, speed = 35) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const chars = Array.from(text);
    setDisplay('');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplay(chars.slice(0, i).join(''));
      if (i >= chars.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return display;
}

function EntranceSplash({ onLogoClick }) {
  const [now] = useState(() => new Date());

  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const dayKey = day.toLowerCase();
  const isWeekend = dayKey === 'saturday' || dayKey === 'sunday';
  const message = `${isWeekend ? "It's" : "Happy"} ${day}! ${DAY_MESSAGES[dayKey]}`;
  const greetingText = `${getTimeGreeting(now.getHours())}. ${message}`;
  const typed = useTypewriter(greetingText);

  return (
    <div className="splash">
      <div className="splash-grain" aria-hidden="true" />

      <button
        type="button"
        className="splash-trigger"
        onClick={onLogoClick}
        aria-label="Enter Kaptured Moment"
      >
        <img src={KapturedMoment} alt="" className="splash-logo" />
        <h6 className="splash-greeting">
          {typed}
          <span className="cursor" aria-hidden="true" />
        </h6>
        <span className="splash-hint">click the logo to enter</span>
      </button>
    </div>
  );
}

export default EntranceSplash;