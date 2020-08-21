import React from "react";

const WelcomePage = () => {
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
                 <form>
                 <h1>See What's Inside</h1>
                    <input placeholder="Name" />
                    <input placeholder="Email" />
                    <input placeholder="Password" />
                    <input id="home-register-btn" type="submit" value="Submit" />
                 </form>
             </div>
         </div>
      </div>
   );
};

export default WelcomePage;
