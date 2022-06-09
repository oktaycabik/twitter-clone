import React, { useEffect } from "react";
import "./notifications.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { getProfile } from "../../redux/Auth/auth";
const Notifications = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <>
      {profile?.notifications.map((notifi: any) => (
        <div key={notifi._id} className="notification-main">
          <div className="notifi d-flex">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="notifi-icon">
              <g>
                <path
                  d="M22.99 11.295l-6.986-2.13-.877-.326-.325-.88L12.67.975c-.092-.303-.372-.51-.688-.51-.316 0-.596.207-.688.51l-2.392 7.84-1.774.657-6.148 1.82c-.306.092-.515.372-.515.69 0 .32.21.6.515.69l7.956 2.358 2.356 7.956c.09.306.37.515.69.515.32 0 .6-.21.69-.514l1.822-6.15.656-1.773 7.84-2.392c.303-.09.51-.37.51-.687 0-.316-.207-.596-.51-.688z"
                  fill="#794BC4"
                ></path>
              </g>
            </svg>
            <div className="ms-3">
              <img
                className="notifi-img "
                src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                alt=""
              />

              <p className="notifi-info">
                <span>{notifi?.info} </span>
              </p>
              <p className="notifi-content">{notifi?.content}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notifications;
