import React,{useEffect} from "react";
import { SearchIcon } from "../icons/Icon";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import "./sidebar.scss";
import { followUser, getAllUsers, getProfile, unFollowUser } from "../../redux/Auth/auth";
const Sidebar = () => {
  const users = useAppSelector((state) => state.auth.users);
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getProfile());
  }, [dispatch])
  const handleFallow=(userId:any)=>{
  
     if(profile?.followings?.includes(userId)){
     dispatch(unFollowUser({userId:userId}))
    }
    dispatch(followUser({userId:userId}))
  }
  const classFallow=(userId:any):string=>{
     
    if(profile?.followings?.includes(userId)){
         return "Unfollow"
     }
     return "follow"
  }
  return (
    <div className="sidebar">
      <div className="searchbar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Twitter"
          className="search-input"
        />
      </div>
      <div className="timeline">
       <div className="title">
         Who to follow
       </div>
      {
        users.map((user:any)=>(
          <div key={user._id} className="user-card">
          <div className="user-info">
            <img className="user-card-img" src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png" alt="" />
             <div className="user-name">
               <div className="name">
                 {user.name}
               </div>
               <div className="username">
                 @{user.username}
               </div>
             </div>
          </div>
          <button onClick={()=>handleFallow(user._id)} className="follow-btn">{classFallow(user._id)}</button>
         </div>
        ))
      }
  
     
      </div>
    </div>
  );
};

export default Sidebar;
