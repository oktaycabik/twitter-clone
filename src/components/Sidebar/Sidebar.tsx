import React from "react";
import { SearchIcon } from "../icons/Icon";

import "./sidebar.scss";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="searchbar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Twitter"
          className="search-input"
        />
      </div>
      <div className="timeline">
       <div className="title">
         Who to follow
       </div>
       <div className="user-card">
         <div className="user-info">
           <img className="user-card-img" src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png" alt="" />
            <div className="user-name">
              <div className="name">
                Oktay Çabik
              </div>
              <div className="username">
                @oktaycabik
              </div>
            </div>
         </div>
         <button className="follow-btn">Follow</button>
       </div>
      </div>
    </div>
  );
};

export default Sidebar;
