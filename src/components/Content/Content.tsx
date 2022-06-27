import Posts from "../../pages/Posts/Posts";
import { Routes, Route, useLocation } from "react-router-dom";
import "./content.scss";
import Explore from "../../pages/Explore/Explore";
import Messages from "../../pages/Messages/Messages";
import Notifications from "../../pages/Notifications/Notifications";
import Profile from "../../pages/Profile/Profile";
import Post from "../../pages/Post/Post";
const Content = () => {
  const locations = useLocation()

 const location= locations.pathname.split("/")[1].charAt(0).toLocaleUpperCase()+locations.pathname.split("/")[1].slice(1)
  return (
    <div className="content">
      <header>
        <div className="navigation-name">{locations.pathname==="/"?"Home" :location}</div>
      </header>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Content;
