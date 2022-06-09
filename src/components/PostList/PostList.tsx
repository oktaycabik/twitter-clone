import React from "react";
import { Link } from "react-router-dom";
import { CommentIcon, LikeIcon, ReTweetIcon } from "../icons/Icon";
import "./postlist.scss";
const PostList = ({post}:any) => {
  return (
    <div key={post?._id} className="post-list">
      <img
        className="post-user-img"
        src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
        alt=""
      />
      <div className="flex-1">
        <div className="post-user-info">
        <Link to={`/profile/${post?.user?._id}`}><span className="post-name">{post?.user?.name}</span>
          <span className="post-username">@{post?.user?.username }</span></Link>
        </div>
        <p className="post-content">{post?.content}</p>
        <img className="post-img" src="https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
        <ul className="post-icons">
          <li>
            <div><CommentIcon/></div>
            <span>{post?.comments?.length}</span>
          </li>
          <li>
            <div><ReTweetIcon/></div>
            <span>7</span>
          </li>
          <li>
            <div><LikeIcon/></div>
            <span>{post?.likes?.length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostList;
