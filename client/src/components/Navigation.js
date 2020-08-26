import React from 'react';
import { Link } from 'react-router-dom';

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
               <h1>R</h1>
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
