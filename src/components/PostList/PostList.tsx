import React from "react";
import { Link } from "react-router-dom";
import { CommentIcon, LikeIcon, ReTweetIcon } from "../icons/Icon";
import { useAppDispatch } from "../../redux/hooks";
import "./postlist.scss";
import { likePost, unlikePost } from "../../redux/Posts/posts";
const PostList = ({ post }: any) => {
  const dispatch = useAppDispatch();
  const handleLike = (id: any) => {
    const userId = localStorage.getItem("id");
    if (post.likes.includes(userId)) {
      dispatch(unlikePost(id));
    }
    dispatch(likePost(id));
  };
  return (
    <div className="post-list">
      <img
        className="post-user-img"
        src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
        alt=""
      />

      <div className="flex-1">
        <div className="post-user-info">
          <Link to={`/profile/${post?.user?._id}`}>
            <span className="post-name">{post?.user?.name}</span>
            <span className="post-username">@{post?.user?.username}</span>
          </Link>
        </div>
        <Link className="link-color" to={`/post/${post?._id}`}>
          <p className="post-content">{post?.content}</p>
          {post?.image && (
            <img
              className="post-img"
              src={`https://twitter-clone-cabiks.herokuapp.com/images/${post?.image}`}
              alt=""
            />
          )}
        </Link>
        <ul className="post-icons">
          <li>
            <CommentIcon />
            <span>{post?.comments?.length}</span>
          </li>
          <li>
            <ReTweetIcon />
            <span>7</span>
          </li>
          <li onClick={() => handleLike(post?._id)}>
            <LikeIcon />
            <span>{post?.likes?.length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostList;
