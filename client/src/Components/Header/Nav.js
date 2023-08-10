import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import userIcon from "../../Assets/Nav/user_icon.png";

const logedInUserInfo = window.localStorage.getItem("logedInUserInfo") || true;

export const Nav = ({ menu, setMenu, setIsLogedIn, isLogedIn, hideNavBar }) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [userInfoLocal, setUserInfoLocal] = useState(
    JSON.parse(logedInUserInfo)
  );

  const username = userInfo?.username;
  const { pathname } = useLocation();

  console.log("userInfoLocal.......---------------.........", userInfoLocal);
  // const url = window.location.pathname;

  // console.log("url--------", url);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo.username);
        console.log("UserInfo-----", userInfo);
        setUserInfoLocal(userInfo.username);
      });
    });
    setRedirect(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("logedInUserInfo", JSON.stringify(userInfoLocal));
  }, [isLogedIn]);

  // console.log("setUserInfo-----------------------", userInfo);

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
    setMenu(false);
    setIsLogedIn(false);
    // setRedirect(true);
  };

  // console.log("userInfo----------", userInfo);
  // console.log("isLogedIn----------", isLogedIn);
  // console.log("userInfo.length----------", userInfo.length);

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  if (pathname.includes("login")) return;
  if (pathname.includes("register")) return;

  return (
    <header className={hideNavBar ? "display_none" : "header"}>
      <nav>
        <Link to="/" className="logo">
          devBlog
        </Link>
        {!isLogedIn && (
          <ul>
            <Link to="/login">
              <li className="nav_login">Login</li>
            </Link>

            <Link to="/register">
              <li className="nav_register">Sign up</li>
            </Link>
          </ul>
        )}
        {isLogedIn && (
          <>
            <img
              src={userIcon}
              alt="logedin user"
              className={"user_img"}
              onClick={handelMenu}
            />
            <div className={menu ? "menu" : "menu_closed"}>
              <button onClick={handelMenu} className="menu_btn">
                {menu ? "X" : "-"}
              </button>
              <div className=" menu_user_info">
                <img
                  src={userIcon}
                  alt="logedin user icon"
                  className="menu_user_info_img"
                />
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
  );
};
