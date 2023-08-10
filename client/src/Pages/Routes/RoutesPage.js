import React from "react";
import { Login } from "../LoginAndRegister/Login";
import { Register } from "../LoginAndRegister/Register";
import { CreatePost } from "../CreatePost/CreatePost";
import { SinglePost } from "../Single_post/SinglePost";
import { EditPost } from "../EditPost/EditPost";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../Home";

export const RoutesPage = ({ setIsLogedIn, setMenu }) => {
  const location = useLocation;
  return (
    // <Routes location={location} key={location.pathname}>
    <Routes>
      <Route index element={<Home />} />
      <Route path={"/login"} element={<Login setIsLogedIn={setIsLogedIn} />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/create_post"} element={<CreatePost setMenu={setMenu} />} />
      <Route path={"/post/:id"} element={<SinglePost />} />
      <Route path={"/edit/:id"} element={<EditPost />} />
    </Routes>
  );
};
