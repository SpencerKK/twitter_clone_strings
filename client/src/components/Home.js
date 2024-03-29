import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import MainStream from "./MainStream";
import RightBar from "./RightBar";

const Home = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="home-wrapper">
            <div className="home-center-container">
                <Navigation />
                <MainStream />
                <RightBar />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);