import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

// components
import Navigation from "./components/Navigation";
import WelcomePage from "./components/WelcomePage";

function App() {
   return (
      <Router>
         <div className="App">
            <WelcomePage />
         </div>
      </Router>
   );
}

export default App;
