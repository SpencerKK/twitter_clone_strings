import React from "react";

const MainStream = () => {
  return (
    <div className="main-stream-wrapper">
      <div className="main-stream-header">
        <p>Home</p>
        <form>
          <div className="home-textarea-wrapper">
            <i className="fas fa-user"></i>
            <textarea placeholder="What's Happening..."></textarea>
          </div>
          <div className="post-addl-wrapper">
            <i className="fas fa-image"></i>
            <i className="far fa-laugh-wink"></i>
            <input id="home-post-btn" type="submit" value="post" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainStream;
