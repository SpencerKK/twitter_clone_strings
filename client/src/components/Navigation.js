import React from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
import siteLogo from "../assets/images/rebound-logo.png";

const navLinks = [
   {
      linkName: 'Home',
      path: '/home',
      linkIcon: 'fa fa-home',
   },
   {
      linkName: 'Liked',
      path: '/liked',
      linkIcon: 'far fa-heart',
   },
   {
      linkName: 'Profile',
      path: '/profile',
      linkIcon: 'far fa-user',
   },
   {
      linkName: 'Search',
      path: '/search',
      linkIcon: 'fas fa-search',
   },
   {
      linkName: 'Logout',
      linkIcon: 'fas fa-sign-out-alt',
   },
];

const Navigation = () => {
   return (
      <nav className="site-nav">
         <div className="menu-content-container">
            <ul>
               <img src={siteLogo} alt="rebound-site-logo-img" id="nav-site-logo" />
               {navLinks.map((link, i) => (
                  <li key={i}>
                     <Link className="wide" to={link.path}>
                        <i className={link.linkIcon}></i>
                        <p>{link.linkName}</p>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   );
};

export default Navigation;
