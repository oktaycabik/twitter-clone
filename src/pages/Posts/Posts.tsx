import React from "react";
import { useEffect } from "react";
import PostList from "../../components/PostList/PostList";
import TweetBox from "../../components/TweetBox/TweetBox";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getPosts } from "../../redux/Counter/counter";

const Posts = () => {
  const posts = useAppSelector((state) => state.item.post);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <div className="tweet-box">
        <img
          className="user-card-img"
          src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
          alt=""
        />

        <TweetBox />
      </div>
      {posts.map((post) => (
        <PostList post={post} />
      ))}
    </div>
  );
};

export default Posts;
