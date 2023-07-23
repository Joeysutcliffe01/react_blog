import React, { useContext, useState } from "react";
import illustration from "../../Assets/LoginPage/login_illustration.png";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../Components/UserContext/UserContext";

export const Login = ({ setIsLogedIn, setHideNavBar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [badCredentials, setBadCredentials] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // console.log("---------------response", response);

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
        setIsLogedIn(true);
      });
    } else {
      setBadCredentials(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  console.log("badCredentials-----------", badCredentials);
  // setHideNavBar(true);

  return (
    <div className="login_container">
      <section className="login_section">
        <form onSubmit={login} className="login_section_form">
          <h3 className="login_section_h2">Login in to your account</h3>
          <div className="login_section_info">
            <p className="login_section_p">Dont have an account? </p>
            <Link to={"/register"} className="login_section_link">
              Sign up!
            </Link>
          </div>
          {badCredentials ? <p>Please check username and password</p> : ""}

          <div className="login_section_username_input_container">
            <h3>Username</h3>
            <input
              type="username"
              // placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login_section_password_input_container">
            <h3>Password</h3>
            <input
              type="password"
              // placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login_section_btn">Login</button>
        </form>
      </section>
      <section className="login_illustration">
        <img src={illustration} alt=" devBlog login illustration" />
      </section>
    </div>
  );
};
