import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginModal from "./LoginModal";

// redux
import { register } from "../actions/auth";
import { connect } from "react-redux";

const WelcomePage = ({ register, isAuthenticated }) => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });

   const { name, email, password } = formData;

   const onRegister = async e => {
       e.preventDefault();
       register({ name, email, password });
   }

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   if (isAuthenticated) {
       return <Redirect to="/home" />
   }

   return (
      <div className="welcome-page-wrapper">
         <div className="welcome-left">
            <div className="welcome-left-text-box">
               <h1>REBOUND</h1>
               <i className="fas fa-users"></i>
               <p>Connect With Friends</p>
               <i className="far fa-keyboard"></i>
               <p>Share Your Thoughts</p>
               <i className="fas fa-search"></i>
               <p>Follow Your Interests</p>
               <i className="far fa-calendar-check"></i>
               <p>Stay Up To Date</p>
            </div>
         </div>
         <div className="welcome-right">
            <div className="welcome-right-text-box">
               <form onSubmit={e => onRegister(e)} >
                  <h1>See What's Inside</h1>
                  <input
                     type="text"
                     name="name"
                     placeholder="Name"
                     autoComplete="none"
                     onChange={(e) => onChange(e)}
                  />
                  <input
                     type="text"
                     name="email"
                     placeholder="Email"
                     autoComplete="none"
                     onChange={(e) => onChange(e)}
                  />
                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     onChange={(e) => onChange(e)}
                  />
                  <input id="home-register-btn" type="submit" value="Submit" />
               </form>
               <LoginModal />
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(WelcomePage);
