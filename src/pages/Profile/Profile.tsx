import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {Helmet} from "react-helmet"
import "./profile.scss";
import {
  CommentIcon,
  LikeIcon,
  ReTweetIcon,
} from "../../components/icons/Icon";
import { getProfile } from "../../redux/Auth/auth";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const loading = useAppSelector((state) => state.auth.loading);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch, id]);

  return (
    <> 
    <Helmet>
      <title>Profile / Twitter</title>
    </Helmet>
    <div>
      <div className="bg-gray"></div>
      <div className="profile">
    
        {
          loading && (
            <div style={{marginBottom:"900px"}} className="loader"></div>
          )
        }
       {
        !loading && (
          <> 
          <img
          className="profile-img"
          src={`https://twitter-clone-cabiks.herokuapp.com/uploads/${profile?.profile_image}`}
          alt=""
        />
          <div className="user-infos">
          <div className="profile-name">{profile?.name}</div>
          <div className="user-details">
            <div>@{profile?.username}</div>
            <div className="join-date">Joined March 2022</div>
            <div className="follows">
              <div>{profile?.followings?.length} Fallowing</div>
              <div className="ms-3">{profile?.followers?.length} Followers</div>
            </div>
          </div>
        </div>
        </>
        )
       }


      </div>
      {profile?.posts.map((post: any) => (
        <div key={post?._id} className="post-list">
          <img
            className="post-user-img"
            src={`https://twitter-clone-cabiks.herokuapp.com/uploads/${profile?.profile_image}`}
            alt=""
          />
          <div className="flex-1">
            <div className="post-user-info">
              <span className="post-name">{profile?.name}</span>
              <span className="post-username">@{profile?.username}</span>
            </div>
            <p className="post-content">{post.content}</p>
            {post?.image && (
              <img
                className="post-img"
                src={`https://twitter-clone-cabiks.herokuapp.com/images/${post?.image}`}
                alt=""
              />
            )}

            <ul className="post-icons">
              <li>
                <div>
                  <CommentIcon />
                </div>
                <span>{post?.comments?.length}</span>
              </li>
              <li>
                <div>
                  <ReTweetIcon />
                </div>
                <span>7</span>
              </li>
              <li>
                <div>
                  <LikeIcon />
                </div>
                <span>{post?.likes?.length}</span>
              </li>
            </ul>
          </div>
        </div>
      )).reverse()}
    </div>
    </>
  );
};

export default React.memo(Profile);
