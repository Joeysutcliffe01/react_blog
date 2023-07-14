import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/" className="logo">
            MyBlog
          </Link>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
