import React, { useEffect, useState } from "react";
import { ILoggedIn } from "../../pages/Login/ILoggedIn";
import {
  ExploreIcon,
  HomeIcon,
  MessageIcon,
  ProfileIcon,
  TwitIcon,
  NotificationIcon,
} from "../icons/Icon";
import { useAppDispatch } from "../../redux/hooks";
import { getProfile } from "../../redux/Auth/auth";
import SideLink from "../SideLink/SideLink";
import UserBox from "../UserBox/UserBox";
import "./menu.scss";

const Menu = ({ loggedIn, setLoggedIn }: ILoggedIn) => {
  const [profilePath, setProfilePath] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("id");
    setProfilePath(userId);
    dispatch(getProfile(userId));
  }, [dispatch]);

  const SideLinks = [
    {
      name: " ",
      icon: TwitIcon,
      path: "/",
    },
    {
      name: "Home",
      icon: HomeIcon,
      path: "/",
    },
    {
      name: "Explore",
      icon: ExploreIcon,
      path: "/explore",
    },
    {
      name: "Notifications",
      icon: NotificationIcon,
      path: "/notifications",
    },
    {
      name: "Messages",
      icon: MessageIcon,
      path: "/messages",
    },
    {
      name: "Profile",
      icon: ProfileIcon,
      path: `/profile/${profilePath}`,
    },
  ];

  return (
    <div className="menu">
      <div>
        <nav>
          <ul>
            {SideLinks.map(({ name, icon, path }) => (
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
