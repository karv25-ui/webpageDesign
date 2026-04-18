/*--> Created by: Kaptured Moment (aka Karv) <--*/
import KapturedMoment from './Kaptured Moment .png';
import './App.css';
/*import { Route, Routes, Link } from 'react-router-dom';*/

/*
function Home() {
  return (
    <h1>Home Page</h1>
  )
}

function Portfolio() {
  return (
    <div>
      <h1>Portfolio Page</h1>
      <nav style={{ marginTop: "20px" }}>
        <Link to="/portfolio/photography">Photography</Link> | {" "}
      </nav>
      <Outlet />
    </div>
  )
}

function Photography() {
  return (
    <div>
      <h1>Photo 1</h1>
      <h1>Photo 2</h1>
      <h1>Photo 3</h1>
    </div>
  )
}
*/

function App() {
/* This displays a friendly message according to each day of the week, as well as greeting based on the time of the day. */
  const time = new Date();
  const day = time.toLocaleString("en-US", { weekday: "long"});
  const hours = time.getHours();
  const morning = hours >= 6 && hours < 12;
  const afternoon = hours >= 12 && hours < 18;
  const evening = hours >= 18 && hours < 24;
  const night = hours >= 0 && hours < 6;

  let dayMessage;
  if (day.toLowerCase() === "monday") {
    dayMessage = `Happy ${day}! Start your week off with a smile! Start with the best foot forward! ❤️`;
  } else if (day.toLowerCase() === "tuesday") {
    dayMessage = `Happy ${day}! Keep pushing through you got this! You're getting closer to the weekend! 😚`;
  } else if (day.toLowerCase() === "wednesday") {
    dayMessage = `Happy ${day}! Halfway there! It's HUMP DAY! Stay strong! 💪🏾`;
  } else if (day.toLowerCase() === "thursday") {
    dayMessage = `Happy ${day}! YOu're almost there, one more day until the weekend! 😁`
  } else if (day.toLowerCase() === "friday") {
    dayMessage = `Happy ${day}! It's finally Friday! The weekend is here! Time to relax and enjoy! 🥳`;
  } else {
    dayMessage = `It's ${day}! Enjoy your weekend, make the best out of it & more importantly stay blessed! 🙏🏾`;
  }

  return (
    
    /* Main App Page */
    <div className="App">
    <div className="background">
    {/* Header if the main page, with logo as the landing page button to enter into the website */}
    {/* The greeting and dayMessage should be displayed with the header, or maybe inside the landing page... stiil comptemplating. */}
      <header className="header">
      <img src={KapturedMoment} alt="Kaptured Moment" className="logo" />
        </header>
       <div className="landing-page">
        <h1></h1>
        <h2></h2>
        {/* This is where the welcome message will be displayed on landing page, along with a short intro or something to draw the users attention and drag them into exploring the webapo. */}
        {/*
        <nav>
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
        </nav>
        */}
        {/*}
        <Routes>
        
          <Route path="/Home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/photography" element={<Photography />} />
        
        </Routes>
        */}
        

        </div>
       <div className="footer">
          <p>&copy; 2026 Kaptured Moment. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;

/* This is the main App component for the Kaptured Moment website/app.
* The App component serves as the root component of the application and is responsible for rendering the overall structure and layout of the website/app.
* The main component of this webapp will contain the navigation menu for user to easily navigate through the webapp seamlessly, creating no issues loading.
* The header of the compenent will have the Kaptured Moment logo on the webapp. (Can either be fixed on the screen and follow the user or it can just remain on the header, still contemplating.)
* Users can use the logo to navigate back to the home page or top of the screen.
* This is the main page of the webapp you will have to click on the logo to navigate to the home page & from there you can explore & navigate through the webapp. 
(This is still being worked on, but the main page will be a landing page with a welcome message and a brief introduction to the website/app, along with a call-to-action button that directs users to explore the portfolio or other sections of the website/app.)

*/