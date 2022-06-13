import React from "react";
import Posts from "../../pages/Posts/Posts";
import {  Routes, Route } from "react-router-dom";
import "./content.scss";
import Explore from "../../pages/Explore/Explore";
import Messages from "../../pages/Messages/Messages";
import Notifications from "../../pages/Notifications/Notifications";
import Profile from "../../pages/Profile/Profile";
import Post from "../../pages/Post/Post";
const Content = () => {
  return (
    <div className="content">
      <header>
        <div className="navigation-name">Home</div>
      </header>
     
      <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/profile/:id" element={<Profile />} />
       </Routes>
      
    </div>
  );
};

export default Content;
