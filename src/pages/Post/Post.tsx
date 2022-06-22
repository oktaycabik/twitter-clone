import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import {
  CommentIcon,
  LikeIcon,
  ReTweetIcon,
} from "../../components/icons/Icon";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  getCommets,
  getPost,
  likeSinglePost,
  newComment,
  unlikeSinglePost,
} from "../../redux/Posts/posts";
import "./post.scss"
const Post = () => {
  const [comment, setComment] = useState("")
  const post = useAppSelector((state) => state.item.singlePost);
  const comments = useAppSelector((state) => state.item.comments);
  const loading = useAppSelector((state) => state.item.loading);
  let { postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    dispatch(getCommets(postId));
  }, [dispatch, postId]);
  const handleLike = (id: any) => {
    const userId = localStorage.getItem("id");
    if (post.likes.includes(userId)) {
      dispatch(unlikeSinglePost(id));
    }
    dispatch(likeSinglePost(id));
  };
  const handleNewComment =()=>{
    const userId = localStorage.getItem("id");
    dispatch(newComment({post:post._id,content:comment,user:userId}))
  }
  console.log('loading', loading)
  return (
    <> 
    {
      loading && (
       <div className="loader"></div>
      )
    }
    {
      !loading && (
          <>
            <div>
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
          <p className="post-content">{post?.content}</p>
          {post?.image && (
            <img
              className="post-img"
              src={`http://localhost:5000/images/${post?.image}`}
              alt=""
            />
          )}

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
      <div className="tweet-box">
        <img
          className="user-card-img"
          src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
          alt=""
        />

        <div className="tweet-card">
          <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className="tweet-text" placeholder="Tweet your reply" />
        
          <div className="icons-button">
    <div></div>
            <button onClick={handleNewComment} className={comment.length>0 ? `tweet-btns`:"untweet-btn"}>Reply</button>
          </div>
        </div>
      </div>

      {comments.map((comment: any) => (
        <Comment key={comment?._id} comment={comment}></Comment>
      ))}
    </div>
          </>

      )
    }
  
    </>
  );
};

export default Post;
