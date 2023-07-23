import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

export const Nav = ({ menu, setMenu, setIsLogedIn, isLogedIn, hideNavBar }) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const username = userInfo?.username;

  console.log("userInfo--------", userInfo);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo.username);
      });
    });

    setRedirect(false);
    if (userInfo?.username) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, [isLogedIn]);

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
    setMenu(false);
    setIsLogedIn(false);
    setRedirect(true);
  };

  // console.log("userInfo----------", userInfo);
  // console.log("isLogedIn----------", isLogedIn);
  // console.log("userInfo.length----------", userInfo.length);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <header className={hideNavBar ? "display_none" : "header"}>
      <nav>
        <Link to="/" className="logo">
          devBlog
        </Link>
        {!isLogedIn && (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
        {isLogedIn && (
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
  );
};
