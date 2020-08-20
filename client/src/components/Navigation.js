import React, { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
   {
      title: "Home",
      path: "/",
   },
   {
      title: "Profile",
      path: "/profile",
   },
   {
      title: "Following",
      path: "/following",
   },
   {
    title: "Login",
    path: "/login",
 },
   {
      title: "Register",
      path: "/register",
   }
];

const Navigation = () => {
   const [menuActive, setMenuActive] = useState(false);

   return (
      <nav className="site-navigation">
         <span>REBOUND</span>
         <div className={`menu-content-container ${menuActive && "active"}`}>
            <ul>
               {navLinks.map((link, index) => (
                  <li key={index}>
                     <Link to={link.path}>{link.title}</Link>
                  </li>
               ))}
            </ul>
            <i className="fas fa-user-astronaut"></i>
         </div>
         <i
            className="fas fa-bars"
            onClick={() => setMenuActive(!menuActive)}
         ></i>
      </nav>
   );
};

export default Navigation;
