import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRef } from "react";
import { UserContext } from "../../Components/UserContext/UserContext";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import loginAnimation from "../../Assets/LottieAnimatio/Home/login_animation_2.json";
import { motion } from "framer-motion";

import illustration from "../../Assets/LoginPage/login_illustration.png";

export const Login = ({ setIsLogedIn, setHideNavBar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [badCredentials, setBadCredentials] = useState(false);

  const { setUserInfo } = useContext(UserContext);
  const animationRef = useRef(null);

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

  // console.log("badCredentials-----------", badCredentials);
  // setHideNavBar(true);

  console.log("Lottie", Lottie);

  return (
    <motion.div
      className="login_container"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0 },
      }}
      exit={{ opacity: 0 }}
    >
      <section className="login_register_section">
        <Link to={"/"} className="login_register_section_home_link">
          {" "}
          <h2>devBloog</h2>
        </Link>
        <form onSubmit={login} className="login_section_form">
          <h3 className="login_register_section_h2">
            Login in to your account
          </h3>
          <div className="login_register_section_info">
            <p className="login_register_section_p">Dont have an account? </p>
            <Link to={"/register"} className="login_register_section_link">
              Sign up!
            </Link>
          </div>
          {badCredentials ? (
            <p className="login_section_badc_credentials">
              Please recheck your username and password
            </p>
          ) : (
            ""
          )}

          <div className="login_register_section_username_input_container">
            <h3>Username</h3>
            <input
              type="username"
              // placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login_register_section_password_input_container">
            <h3>Password</h3>
            <input
              type="password"
              // placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login_register_section_btn">Login</button>
        </form>
      </section>
      <section className="login_illustration">
        <Lottie
          animationData={loginAnimation}
          loop={false}
          // lottieRef={animationRef}
          // onComplete={() => {
          //   animationRef.current?.goToAndPlay(1, true);
          // }}
          style={{ height: "99%" }}
        />
      </section>
    </motion.div>
  );
};
