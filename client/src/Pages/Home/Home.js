import React, { useEffect, useState } from "react";
import { Posts } from "../Components/Posts/Post";
import { Hero } from "../Components/Hero/Hero";
import { motion } from "framer-motion";
import blobEmpty1 from "../../Assets/Blobs/blob_empty_1.svg";

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  // console.log("posts_", posts && posts[0]._id);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      className="home_container"
    >
      <Hero />
      {/* <img src={blobEmpty1} alt="empty blob" className="blob_empty" /> */}
      <div className="posts_container">
        <img src={blobEmpty1} alt="empty blob" className="blob_empty" />
        {posts.length > 0 &&
          posts.map((post, i) => {
            return (
              <Posts {...post} key={i + Math.floor(Math.random() * 100000)} />
            );
          })}
      </div>
    </motion.div>
  );
};
