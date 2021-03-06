import React from "react";
import { Link } from "react-router-dom";
import "./sidelink.scss";



const SideLink = ({  name, Icon,path }: any) => {

  return (
    <div >
      <li className="link-list">
        <Link to={path}>
          <div className="provider">
            <div className="link-items">
              <div>
                <Icon></Icon>
              </div>
              <span className="link-name">{name}</span>
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
};

export default SideLink;
