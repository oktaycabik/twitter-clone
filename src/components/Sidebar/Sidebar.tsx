import React, { useEffect, useState,useCallback } from "react";
import { SearchIcon } from "../icons/Icon";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import "./sidebar.scss";
import {
  followUser,
  getAllUser,
  getAllUsers,
  getProfile,
  unFollowUser,
} from "../../redux/Auth/auth";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [findUser, setFindUser] = useState("");
  const users = useAppSelector((state) => state.auth.users);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const allUser = useAppSelector((state) => state.auth.allUser);
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const userId = localStorage.getItem("id");

    dispatch(getAllUsers(findUser));
    dispatch(getAllUser());
    dispatch(getProfile(userId));
  }, [dispatch, findUser]);

  const handleFallow = (userId: any) => {
    if (currentUser?.followings?.includes(userId)) {
      dispatch(unFollowUser({ userId: userId }));
    }
    dispatch(followUser({ userId: userId }));
  };
  const classFallow = (userId: any): string => {
    if (currentUser?.followings?.includes(userId)) {
      return "Unfollow";
    }
    return "follow";
  };
const handleChange = useCallback((e:any)=>{
  setFindUser(e.target.value)
},[])
 
const filterUsers=allUser.filter((user:any)=>user._id!==userId)
  return (
    <div className="sidebar">
      <div className="searchbar">
        <SearchIcon />
        <input
          value={findUser}
          onChange={handleChange}
          type="text"
          placeholder="Search Twitter"
          className="search-input"
        />
      </div>
      <div className={findUser.length > 0 ? "user-list" : "user-unlist"}>
        <ul>
          {findUser.length < 3 && (
            <>
              <li className="try-search">
                Try searching for people, topics, or keywords
              </li>
            </>
          )}
          {findUser.length > 2 && (
            <>
              {users.map((user: any) => (
                <Link className="color-white" to={`/profile/${user?._id}`}>
                  <li key={user?._id}>
                    <div className="user-info">
                      <img
                        className="user-card-img"
                        src={`https://twitter-clone-cabiks.herokuapp.com/uploads/${user?.profile_image}`}
                        alt=""
                      />
                      <div className="user-name">
                        <div className="name">{user?.name}</div>
                        <div className="username">@{user?.username}</div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </>
          )}
        </ul>
      </div>
      <div className="timeline">
        <div className="title">Who to follow</div>
      {
          loading && (
            <div style={{marginBottom:"100px"}} className="loader"></div>
          )
      }
      {
        !loading && (
          <>
                {filterUsers.map((user: any) => (
          <div key={user._id} className="user-card">
            <Link className="link-color" to={`/profile/${user._id}`}>
              {" "}
              <div className="user-info">
                <img
                  className="user-card-img"
                  src={`https://twitter-clone-cabiks.herokuapp.com/uploads/${user?.profile_image}`}
                  alt=""
                />
                <div className="user-name">
                  <div className="name">{user.name}</div>
                  <div className="username">@{user.username}</div>
                </div>
              </div>
            </Link>
            <button
              onClick={() => handleFallow(user._id)}
              className="follow-btn"
            >
              {classFallow(user._id)}
            </button>
          </div>
        ))}
          </>
        )
      }
      
  
      </div>
    </div>
  );
};

export default Sidebar;
