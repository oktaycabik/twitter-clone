import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";


import "./profile.scss";
import {
  CommentIcon,
  LikeIcon,
  ReTweetIcon,
} from "../../components/icons/Icon";
import { getProfile } from "../../redux/Auth/auth";

const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  let { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile(id));
  }, [dispatch,id]);
  
  return (
    <div>
      <div className="bg-gray"></div>
      <div className="profile">
        <img
          className="profile-img"
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
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
      </div>
     {
       profile?.posts.map((post:any)=>(
        <div key={post?._id} className="post-list">
        <img
          className="post-user-img"
          src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png"
          alt=""
        />
        <div className="flex-1">
          <div className="post-user-info">
            <span className="post-name">{profile?.name}</span>
            <span className="post-username">@{profile?.username}</span>
          </div>
          <p className="post-content">{post.content}</p>
          <img
            className="post-img"
            src="https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
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
       ))
     }
  
    </div>
  );
};

export default Profile;
