
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import PostList from "../../components/PostList/PostList";
import TweetBox from "../../components/TweetBox/TweetBox";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getPosts } from "../../redux/Posts/posts";

const Posts = () => {
  const posts = useAppSelector((state) => state.item.post);
  const loading = useAppSelector((state) => state.item.loading);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Home / Twitter</title>
      </Helmet>
      <div className="tweet-box">
        <img
          className="user-card-img"
          src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
          alt=""
        />

        <TweetBox />
      </div>
      {loading && <div className="loader"></div>}
      {!loading && (
        <div  >
          {posts.map((post) => (
            <PostList key={post?._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
