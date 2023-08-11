import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../Components/UserContext/UserContext";
import { motion } from "framer-motion";
import pencil from "../../Assets/Icons/icons8-pencil-480.png";
import blob5 from "../../Assets/Blobs/blob_5.svg";
import blob3 from "../../Assets/Blobs/blob_3.svg";

export const SinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  console.log("----------userInfo----------", userInfo);

  // const { title, summary, author, content, cover, createdAt, updatedAt } =
  //   postInfo;

  console.log("postInfo", postInfo);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((resInfo) => {
        setPostInfo(resInfo);
      });
    });
  }, []);

  console.log();

  if (!postInfo) return "";

  console.log("postInfo singlePost----------------", postInfo.cover);

  return (
    <motion.section
      className="single_post_section"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1 },
      }}
      exit={{ opacity: 0 }}
    >
      <img src={blob5} alt="devVlog blob 5" className="section_blob_top" />
      {/* <img
        src={blob3}
        alt="devVlog blob 3"
        className="single_post_section_blob-3"
      /> */}
      <div className="single_post_hero">
        <img
          className="single_post_cover_img"
          src={`http://localhost:4000/${postInfo.cover}`}
          alt="cover"
        />
        <h3>{"@" + postInfo.author.username}</h3>
        <time className="">
          {format(new Date(postInfo.createdAt), "MMM d yyyy, HH:MM")}
        </time>
        <h2 className="single_post_title">{postInfo.title}</h2>
      </div>
      <section className="single_post_content">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </section>
      <section className="single_post_edit_btn_container">
        {userInfo?.id === postInfo.author._id && (
          <Link to={`/edit/${postInfo._id}`}>
            <button className="single_post_edit_btn">
              <h3 className="single_post_edit_btn_h3">Edit</h3>
              <img
                className="single_post_edit_btn_icon"
                src={pencil}
                alt="pencil icon"
              />
            </button>
          </Link>
        )}
      </section>
    </motion.section>
  );
};
