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