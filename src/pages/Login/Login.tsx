import React from "react";
import { TwitIcon } from "../../components/icons/Icon";
import "./login.scss";
const Login = () => {
  return (
    <div className="login-page">
      <div className="login-img">
        <img
          className="twter-img"
          src="https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png"
          alt=""
        />
      </div>
      <div className="login">
        <div className="tweet-icon">
          <TwitIcon></TwitIcon>
          <h1 className="title">
            Şu anda olup <br /> bitenler
          </h1>
          <h2 className="join-title">Twitter'a bugün katıl.</h2>
        </div>
        <div className="login-form">
          <input className="email" type="text" placeholder="E-mail" />
          <input className="password" type="text" placeholder="Password" />
        </div>
      </div>
    </div>
  );
};

export default Login;
