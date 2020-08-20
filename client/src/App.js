import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

// components
import Navigation from "./components/Navigation";

function App() {
   return (
      <Router>
         <div className="App">
            <Navigation />
         </div>
      </Router>
   );
}

export default App;
