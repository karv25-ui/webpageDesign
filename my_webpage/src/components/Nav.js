import { Route, Routes, Link } from 'react-router-dom';
import Home from './Home';

function Nav() {
    return (
       <> 
       <nav className ="crumbs">
            <ul> 
                <li><Link to="/">Home</Link></li>
                {/*}
               
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                */}
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            {/*
            
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            */}
        </Routes>
        </>
    )
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