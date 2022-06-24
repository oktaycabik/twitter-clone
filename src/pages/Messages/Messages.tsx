import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./messages.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getMessages, newMessage } from "../../redux/Posts/posts";
import { getAllUser } from "../../redux/Auth/auth";
const Messages = () => {
  const [text, setText] = useState("")
  const [user, setUser] = useState("")
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.item.messages);
  const users = useAppSelector((state) => state.auth.allUser);
  const userId = localStorage.getItem("id");
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const handleMessages = (id: any) => {
    dispatch(getMessages(id));
    setUser(id)
  };
  const handleNewMessage =(e:any)=>{
    dispatch(newMessage({message:text,user:user}))
    setText("")
    e.preventDefault()
  }
  console.log("messages", messages);
  return (
    <>
      <div className="message-card">
        <Helmet>
          <title>Messages / Twitter</title>
        </Helmet>
        <div>
          {users.map((user: any) => (
            <div
              onClick={() => handleMessages(user._id)}
              key={user._id}
              className="user-card"
            >
              {" "}
              <div className="user-info">
                <img
                  className="user-card-img"
                  src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
                  alt=""
                />
                <div className="user-name">
                  <div className="name">{user.name}</div>
                  <div className="username">@{user.username}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="message-container">
          {messages.map((message: any) => (
            <div
              key={message._id}
              className={
                userId === message.currentUser
                  ? "message-box-me"
                  : "message-box"
              }
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <div className="message-write">
        <form onSubmit={handleNewMessage} action="">
          <input value={text} onChange={e=>setText(e.target.value)} className="" type="text" placeholder="Start a new message" />
        </form>
      </div>
    </>
  );
};

export default Messages;
