import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

// redux
import store from "./store";
import { Provider } from "react-redux";

// components
import Navigation from "./components/Navigation";
import WelcomePage from "./components/WelcomePage";

function App() {
   return (
      <Provider store={store}>
         <Router>
            <div className="App">
               <WelcomePage />
            </div>
         </Router>
      </Provider>
   );
}

export default App;
