import React, { useEffect, useState } from "react";
import { Posts } from "../Components/Posts/Post";

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  console.log("posts_", posts);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Posts {...post} />;
        })}
    </>
  );
};
