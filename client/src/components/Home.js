import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./Navigation";

const Home = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="home-wrapper">
            <Navigation />
            <p>Home Page Content</p>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home);