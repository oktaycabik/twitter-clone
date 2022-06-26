import React, { useState, useEffect } from "react";

import { TwitIcon } from "../../components/icons/Icon";
import { getAllUser, login, register } from "../../redux/Auth/auth";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ILoggedIn } from "./ILoggedIn";

import "./login.scss";

const Login = ({ setLoggedIn }: ILoggedIn) => {
  const users = useAppSelector((state) => state.auth.allUser);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regUsername, setRegUsername] = useState<string>("");
  const [regName, setRegName] = useState<string>("");
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const handleRegister = () => {
    dispatch(
      register({
        username: regUsername,
        name: regName,
        email: regEmail,
        password: regPassword,
      })
    ).then((data: any) => {
      console.log("data", data);
      if (data.payload.success === true) {
        setRegName("")
        setRegUsername("")
        setRegEmail("")
        setRegPassword("")
        setShow(false);
      }
    });
  };

  const checkEmail = users.find((user: any) => user.email === regEmail);
  
  const checkUsername = users.find(
    (user: any) => user.username === regUsername
  );
 
  let disableds =
    regUsername === "" ||
    regName === "" ||
    regEmail === "" ||
    regPassword === "" ||
    regPassword.length < 6 ||
    checkEmail || 
    checkUsername;
  const handleLogin = () => {
    dispatch(login({ email: email, password: password })).then((user) => {
      if (user?.payload?.access_token) {
        window.location.reload();
      }else{
        setCheckLogin(true)
      }
    });

    setLoggedIn(true);
  };
  const handleShow =()=>{
    setShow(false)
    setRegName("")
    setRegUsername("")
    setRegEmail("")
    setRegPassword("")
  }

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
          is currently
                <br /> what's going on
          </h1>
          <h2 className="join-title">Join Twitter today.</h2>
        </div>

        <div className="login-form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
            type="email"
            placeholder="E-mail"
          />
           
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
            type="password"
            placeholder="Password"
          />
           {checkLogin  && (
            <span className="error-input">
              Your password or email is incorrect
            </span>
          )}
          <button onClick={handleLogin} className="login-btn">
            Sing in
          </button>
          <button onClick={() => setShow(true)} className="login-btn">
            Register
          </button>
        </div>
      </div>
      <div className={show ? "register-model" : "register-none"}>
        <div className="close-button" onClick={handleShow}>
          X
        </div>
        <span className="create">Create your account</span>
        <div className="login-form">
          <input
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="email"
            type="email"
            placeholder="E-mail"
          />
          {checkEmail && (
            <span className="error-input">
              There is already an account with this email
            </span>
          )}
          <input
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            className="password"
            type="text"
            placeholder="Name"
          />
          <input
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            className="password"
            type="text"
            placeholder="Username"
          />
          {checkUsername && (
            <span className="error-input">
              There is already an account with this username
            </span>
          )}
          <input
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="password"
            type="password"
            placeholder="Password"
          />
          {regPassword.length < 6 && (
            <span className="error-input">
              Please provide a password with min length:6
            </span>
          )}
          <button
            disabled={disableds}
            onClick={handleRegister}
            className="register-btn"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
