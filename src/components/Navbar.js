import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = ()=>{
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to="/" className="brand-logo left ">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/SignIn">SignIn</Link></li>
        <li><Link to="/SignUp">SignUp</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/CreatePost">CreatePost</Link></li>
      </ul>
    </div>
  </nav>
    );   
}

export default Navbar;
