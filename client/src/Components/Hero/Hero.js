import React from "react";
import heroImg from "../../Assets/Home/hero_bg-2.png";
import blob4 from "../../Assets/Blobs/blob_4.svg";
import blob1 from "../../Assets/Blobs/blob_2.svg";
import Lottie from "lottie-react";
import heroAnimation from "../../Assets/LottieAnimatio/Home/animation_lkwlld5h.json";

export const Hero = () => {
  return (
    <section className="hero_section">
      <img src={blob4} alt="devblog blobs" className="hero_blob_4" />
      <img src={blob1} alt="devblog blobs" className="hero_blob_1" />
      <Lottie animationData={heroAnimation} className="hero_anmation" />
      <div className="hero_info_container">
        <h3 className="hero_heading">
          Welcome to <span>devBlog</span>, unveiling the World of Web
          Development
        </h3>
        <p className="hero_p">
          Are you ready to embark on a journey into the dynamic realm of web
          development? Look no further, as <span>devBlog</span> is your one-stop
          destination for all things web development!
        </p>
      </div>
    </section>
  );
};
