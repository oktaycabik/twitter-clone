import React,{useEffect} from "react";
import { ILoggedIn } from "../../pages/Login/ILoggedIn";
import {
  ExploreIcon,
  HomeIcon,
  MessageIcon,
  ProfileIcon,
  TwitIcon,
  NotificationIcon,
} from "../icons/Icon";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getProfile } from "../../redux/Auth/auth";
import SideLink from "../SideLink/SideLink";
import UserBox from "../UserBox/UserBox";
import "./menu.scss";

const Menu = ({loggedIn,setLoggedIn}:ILoggedIn) => {
  
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("id");
    dispatch(getProfile(userId));
  }, [dispatch]);
const SideLinks = [
  {
    name: "Home",
    icon: HomeIcon,
    path:"/"
  },
  {
    name: "Explore",
    icon: ExploreIcon,
    path:"/explore"

  },
  {
    name: "Notifications",
    icon: NotificationIcon,
    path:"/notifications"

  },
  {
    name: "Messages",
    icon: MessageIcon,
    path:"/messages"

  },
  {
    name: "Profile",
    icon: ProfileIcon,
    path:`/profile/${profile?._id}`

  },
];

  return (
    <div className="menu">
      <div>
        
        <nav>
          <ul>
            {SideLinks.map(({ name, icon,path }) => (
              <SideLink key={name} name={name} Icon={icon} path={path} />
            ))}
          </ul>
        </nav>
        <button className="tweet-btn">Tweet</button>
      </div>
      <div>
          <UserBox loggedIn={loggedIn} setLoggedIn={setLoggedIn}></UserBox>
      </div>
    </div>
  );
};

export default Menu;
