import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successfulReg, setSuccessfulReg] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("response--------", response);

    if (response.status === 200) {
      // alert("registration successful");
      setSuccessfulReg(true);
      setUsername("");
      setPassword("");
    } else {
      console.log("response-----", response);
      alert("registration_failed");
    }
  };

  if (successfulReg) {
    return <Navigate to={"/login"} />;
  }

  return (
    <form onSubmit={register}>
      <h2>Register</h2>
      <input
        type="username"
        placeholder="Enter username"
        value={username}
        name=""
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        name=""
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
};
