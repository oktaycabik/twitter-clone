import React, { useState } from "react";
import { TwitIcon } from "../../components/icons/Icon";
import { login } from "../../redux/Auth/auth";

import { useAppDispatch } from "../../redux/hooks";
import { ILoggedIn } from "./ILoggedIn";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = ({ loggedIn, setLoggedIn }: ILoggedIn, props: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login({ email: email, password: password })).then(() => {
      navigate("/");
      window.location.reload();
    });

    window.location.reload();
    setLoggedIn(true);
  };

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
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
            type="text"
            placeholder="E-mail"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
            type="text"
            placeholder="Password"
          />
          <button onClick={handleLogin} className="login-btn">
            Sing in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
