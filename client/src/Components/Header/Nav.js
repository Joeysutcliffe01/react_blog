import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

export const Nav = ({ menu, setMenu, setIsLogedIn, isLogedIn }) => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo.username);
      });
    });
  }, []);

  console.log("setUserInfo-----------------------", userInfo);

  const handelMenu = () => {
    setMenu((prev) => !prev);
  };

  // console.log("userInformation------------", userInformation);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    setIsLogedIn(false);
    setMenu(false);
  };

  console.log("userInfo----------", userInfo);

  return (
    <>
      <header className="">
        <nav>
          <Link to="/" className="logo">
            MyBlog
          </Link>
          {!userInfo ? (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          ) : (
            <>
              <h2
                className={menu ? "display_none" : "user_img"}
                onClick={handelMenu}
              >
                🙂
              </h2>
              <div className={menu ? "menu" : "menu_closed"}>
                <button onClick={handelMenu} className="menu_btn">
                  {menu ? "X" : "-"}
                </button>
                <div className=" menu_user_info">
                  <h2 className="menu_user_info_img">🙂</h2>
                  <h3 className="menu_user_info_h3"> {userInfo.username}</h3>
                </div>

                <Link
                  to="/create_post"
                  className="menu_create_post"
                  onClick={handelMenu}
                >
                  Create post
                </Link>
                <button onClick={logout} className="menu_logout">
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
};
