import React from "react";

const PostCard = () => {
  return (
    <div className="post-card-wrapper">
      <i className="fas fa-user"></i>
      <div className="post-card-content">
        <h5>UserName</h5>
        <p>
          This is a card text content. This will be dynamically added later. But
          for now, I'm just typing some stuff out because I don't mind typing.
        </p>
      </div>
    </div>
  );
};

export default PostCard;
