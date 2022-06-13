import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CommentIcon, LikeIcon, ReTweetIcon } from "../../components/icons/Icon";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getPost } from "../../redux/Posts/posts";

const Post = () => {
  const post = useAppSelector((state) => state.item.singlePost);
  let { postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch,postId]);

  return <div>
        <div  className="post-list">
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
  
            <CommentIcon className="icon-color"/>
            <span>{post?.comments?.length}</span>
      
          
          </li>
          <li>
            <ReTweetIcon/>
            <span>7</span>
          </li>
          <li>
            <LikeIcon/>
            <span>{post?.likes?.length}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>;
};

export default Post;
