import React, { useEffect, useState } from "react";
import "./explore.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getTrendPost } from "../../redux/Posts/posts";
import PostList from "../../components/PostList/PostList";
import { Helmet } from "react-helmet";
const Explore = () => {
  const [sort, setSort] = useState("most-likes");
  const posts = useAppSelector((state) => state.item.trendPost);
  const loading = useAppSelector((state) => state.item.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTrendPost(sort));
  }, [dispatch, sort]);
  return (
    <div>
      <Helmet>
        <title>Explore / Twitter</title>
      </Helmet>
      <div className="trend-buttons">
        <button
          onClick={() => setSort("most-likes")}
          className={sort === "most-likes" ? "unlike-btn" : "like-btn"}
        >
          Likes
        </button>
        <button
          onClick={() => setSort("most-comment")}
          className={sort === "most-comment" ? "uncomment-btn" : "comment-btn"}
        >
          Comments
        </button>
      </div>
      {loading && (
        <div className="scroll">
          <div className="loader"></div>
        </div>
      )}
      {!loading && (
        <>
          {posts.map((post) => (
            <PostList key={post?._id} post={post}></PostList>
          ))}
        </>
      )}
    </div>
  );
};

export default Explore;
