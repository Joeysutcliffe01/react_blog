import React from "react";

export function Posts() {
  return (
    <>
      <section className="post_section">
        {/* ---------------------------------- post 1*/}
        <div className="posts">
          <img
            src="https://th.bing.com/th/id/OIP.vaiC1vy9F2iPeOXuMKrMRgHaD2?pid=ImgDet&rs=1"
            alt="react post"
          />
          <div className="posts_info">
            <h2>
              React Canaries: Enabling Incremental Feature Rollout Outside Meta
            </h2>
            <a href="/" className="post_auther_info_link">
              <span className="post_auther_info_name">Joseph Sutcliffe</span>
              <time className="post_auther_info_date">2023-01-06 10:55</time>
            </a>
            <p>
              We'd like to offer the React community an option to adopt
              individual new features as soon as their design is close to final,
              before they're released in a stable
            </p>
          </div>
        </div>

        {/* ---------------------------------- post 2*/}
        <div className="posts">
          <img
            src="https://teknotrait.com/wp-content/uploads/2016/07/1_S6RrPKnVyVoRpDmkALHWpg-1024x648.png"
            alt="react post"
          />
          <div className="posts_info">
            <h2>
              React Canaries: Enabling Incremental Feature Rollout Outside Meta
            </h2>
            <a href="/" className="post_auther_info_link">
              <span className="post_auther_info_name">Joseph Sutcliffe</span>
              <time className="post_auther_info_date">2023-01-06 10:55</time>
            </a>
            <p>
              We'd like to offer the React community an option to adopt
              individual new features as soon as their design is close to final,
              before they're released in a stable
            </p>
          </div>
        </div>

        {/* ---------------------------------- post 3*/}
        <div className="posts">
          <img
            src="https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/08/22102526/React-1.png"
            alt="react post"
          />
          <div className="posts_info">
            <h2>
              React Canaries: Enabling Incremental Feature Rollout Outside Meta
            </h2>
            <a href="/" className="post_auther_info_link">
              <span className="post_auther_info_name">Joseph Sutcliffe</span>
              <time className="post_auther_info_date">2023-01-06 10:55</time>
            </a>
            <p>
              We'd like to offer the React community an option to adopt
              individual new features as soon as their design is close to final,
              before they're released in a stable
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
