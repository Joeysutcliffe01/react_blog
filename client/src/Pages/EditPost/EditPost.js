import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../../Components/Editor/Editor";
import { motion } from "framer-motion";
import uploadIcon from "../../Assets/EditPost/upload_photo_icon.png";
import blob5 from "../../Assets/Blobs/blob_5.svg";

import Lottie from "lottie-react";
import fileUploaded from "../../Assets/LottieAnimatio/Home/uploaded_animation.json";

export const EditPost = () => {
  const [fullPostInfo, setFullPostInfo] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [fileUpdated, setFileUpdated] = useState();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setFullPostInfo(postInfo);
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setFiles(postInfo.cover);
      });
    });
  }, []);

  // console.log("files-------", typeof files === "string");
  // console.log("fullPostInfo", fullPostInfo);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <motion.form
      onSubmit={updatePost}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1 },
      }}
      exit={{ opacity: 0 }}
      className="edit_post_form"
    >
      <img src={blob5} alt="devVlog blob 5" className="section_blob_top" />
      {typeof files === "string" ? (
        <label className="label edit_post">
          <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
          <div className="edit_post_upload_icon_container">
            <img
              src={uploadIcon}
              alt="upload icon"
              className="edit_post_upload_icon"
            />
          </div>
          <img
            src={`http://localhost:4000/${files}`}
            alt="Create post cover icon placeholder"
            className="edit_post_cover_img"
          />
        </label>
      ) : (
        <label className="label edit_post">
          <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
          <div className="edit_post_upload_icon_container">
            <Lottie
              animationData={fileUploaded}
              className="cover_anmation"
              loop={false}
            />
          </div>
        </label>
      )}

      <div className="input_container title">
        <h3>Title</h3>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="post_form_title"
        />
      </div>
      <div className="input_container summary">
        <h3>Summary</h3>
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className="post_form_summary"
        />
      </div>

      <h3 className="edit_form_content_h3 ">Content</h3>
      <Editor onChange={setContent} value={content} />

      <div className="edit_btn_container">
        <button className="post_form_btn edit_btn">Update post</button>
      </div>
    </motion.form>
  );
};
