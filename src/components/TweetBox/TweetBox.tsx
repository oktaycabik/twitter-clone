import React from "react";
import "./tweetbox.scss";
const TweetBox = () => {
  return (
    <div className="tweet-card">
      <textarea className="tweet-text" placeholder="What's happening?" />
      <div className="icons-button">
       <div>
           
       </div>
        <button className="tweet-btn">Tweet</button>
      </div>
    </div>
  );
};

export default TweetBox;
