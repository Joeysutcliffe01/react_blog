import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Components/UserContext/UserContext";
import { motion } from "framer-motion";
import { Editor } from "../../Components/Editor/Editor";
import coverPhotoIcon from "../../Assets/Icons/cover_photo_icon 1.svg";
import coverPhotoIconUploaded from "../../Assets/Icons/cover_photo_icon 4.svg";
import blob5 from "../../Assets/Blobs/blob_5.svg";
import Lottie from "lottie-react";
import heroAnimation from "../../Assets/LottieAnimatio/Home/uploaded_animation.json";

export const CreatePost = () => {
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [missingCoverPhoto, setMissingCoverPhoto] = useState(false);

  const userName = userInfo?.username;

  // const  window.onbeforeunload = function () {
  //     window.scrollTo(0, 0);
  //   };

  console.log("missingCoverPhoto--------------", missingCoverPhoto);

  const createNewPost = async (e) => {
    e.preventDefault();

    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });

    if (!files) {
      return setMissingCoverPhoto(true);
    } else {
      setMissingCoverPhoto(false);
    }

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    console.log("files--------", files);

    const response = await fetch("http://localhost:4000/create_post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  // console.log("!!!!!!!!!!!userInfo---------", userInfo);

  // if (redirect || !userName) {
  //   return <Navigate to={"/"} />;
  // }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  if (missingCoverPhoto === true) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {missingCoverPhoto && (
        <h2 className="missing_photo">
          <span>❗</span> missing Cover Photo
        </h2>
      )}
      <img src={blob5} alt="devVlog blob 5" className="section_blob_top" />
      <motion.section
        className="create_form_section"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1 },
        }}
        exit={{ opacity: 0 }}
      >
        <form onSubmit={createNewPost} className="post_form">
          {!files ? (
            <label className="label">
              <input
                type="file"
                // value={files}
                onChange={(e) => setFiles(e.target.files)}
                className="label"
              />
              <img
                src={coverPhotoIcon}
                alt="Create post cover icon placeholder"
                className="Cover_icon_placeholder"
              />
            </label>
          ) : (
            <>
              <label className="label photoUploaded">
                <img
                  src={coverPhotoIconUploaded}
                  alt="Create post cover icon placeholder"
                  className="Cover_icon_placeholder"
                />
                <div className="cover_photo_uploaded_info">
                  {/* <h3>Photo has been uploaded</h3> */}
                  <Lottie
                    animationData={heroAnimation}
                    className="cover_anmation"
                    loop={false}
                  />

                  <h5 className="cover_uploaded_name">{files[0].name}</h5>
                  <input
                    type="file"
                    // value={files}
                    onChange={(e) => setFiles(e.target.files)}
                    className="label"
                  />
                  <h5 className="cover_upload_another_file">
                    Chose a different photo
                  </h5>
                </div>
              </label>
            </>
          )}

          <div className="input_container title">
            <h3>Title</h3>
            <input
              type="title"
              // placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="post_form_title"
            />
          </div>

          <div className="input_container summary">
            <h3>Summary</h3>
            <input
              type="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="post_form_summary"
            />
          </div>
          <h3 className="post_form_content_h3">Content</h3>
          <Editor value={content} onChange={setContent} />

          <button className="post_form_btn">Submit Blog</button>
        </form>
      </motion.section>
    </>
  );
};
