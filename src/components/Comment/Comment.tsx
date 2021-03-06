import React from "react";
import { Link } from "react-router-dom";

import "./comment.scss";
const Comment = ({ comment }: any) => {

  return (
    <>

      <div className="post-list">
        <img
          className="post-user-img"
          src={`https://twitter-clone-cabiks.herokuapp.com/uploads/${comment?.user?.profile_image}`}
          alt=""
        />

        <div className="flex-1">
          <div className="post-user-info">
            <Link to={`/profile/${comment?.user?._id}`}>
              <span className="post-name">{comment?.user?.name}</span>
              <span className="post-username">@{comment?.user?.username}</span>
            </Link>
          </div>

          <p className="post-content">{comment?.content}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
