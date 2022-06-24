import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { ILoggedIn } from "../../pages/Login/ILoggedIn";
import {  logout } from "../../redux/Auth/auth";
import { useAppDispatch,useAppSelector } from "../../redux/hooks";

import "./userbox.scss";

const UserBox = ({loggedIn,setLoggedIn}:ILoggedIn) => {
  const [visible, setVisible] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const handleClick  = () => {
    setVisible(visible === false ? true : false);
  };
  let navigate =useNavigate()
 const handleLogout=()=>{

    dispatch(logout()).then(a=>{
      if(a.payload.message){
        navigate("/")
        window.location.reload()
    
      }
    });

    setLoggedIn(false)
 }

  return (
    <div className="prow">
      <div className={visible ? "logout" : "logout-none"}>
        <div className="user-info-logout">
          <img
            className="logout-img"
            src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
            alt="Profile"
          />
          <div className="user-info">
            <div className="name">{currentUser?.name}</div>
            <div className="username">@{currentUser?.username}</div>
          </div>
        </div>
        <div onClick={handleLogout} className="btn-logout">Log out @{currentUser?.username}</div>
      </div>

      <div onClick={handleClick} className="user-box">
        <img
          src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
          alt="Profile"
        />
        <div className="user-info">
          <div className="name">{currentUser?.name}</div>
          <div className="username">@{currentUser?.username}</div>
        </div>
        <div className="dot-icon">
          <div className="dot1"></div>
          <div className="dot2"></div>
          <div className="dot3"></div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
