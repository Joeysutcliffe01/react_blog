import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Components/UserContext/UserContext";

export const Login = ({ setIsLogedIn }) => {
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

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      {badCredentials ? <p>Please check username and password</p> : ""}
      <input
        type="username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};
