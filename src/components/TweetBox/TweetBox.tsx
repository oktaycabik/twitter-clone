import React, { useState } from "react";
import "./tweetbox.scss";
import { useAppDispatch } from "../../redux/hooks";
import { newPost, upload } from "../../redux/Posts/posts";
import { UploadIcon } from "../icons/Icon";
const TweetBox = () => {
  const [tweet, seTtweet] = useState("");
  const [file, setFile] = useState<any>(null);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("id");
  const handleNewPost = () => {
    const newsPost = {
      content: tweet,
      user: userId,
      image: "",
    };
    if (file) {
      const data: any = new FormData();
      const fileName: any = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newsPost.image = file.name;

      try {
        dispatch(upload(data));
      } catch (error) {
        console.log("error", error);
      }
    }
    if(tweet.length>0){
    try {
      
      dispatch(newPost(newsPost));
    
    } catch (error) {
      console.log("error", error);
    }
  }
    seTtweet("");
  };

  return (
    <div className="tweet-card">
      <textarea
        value={tweet}
        onChange={(e) => seTtweet(e.target.value)}
        className="tweet-text"
        placeholder="What's happening?"
      />
      {/* <img
            className="file-img"
            src={file}
            alt="Profile"
          /> */}
      <div className="icons-button">
        <div className="file-upload">
          <label htmlFor="file-input">
            <UploadIcon></UploadIcon>
          </label>
          <input
            onChange={(e: any) => setFile(e.target.files[0])}
            type="file"
            name="file"
            id="file-input"
          />
        </div>

        <div></div>
        <button onClick={handleNewPost} className={tweet.length>0 ?`tweet-btn`:`untweet-btn`}>
          Tweet
        </button>
      </div>
    </div>
  );
};

export default TweetBox;
