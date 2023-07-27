import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Components/UserContext/UserContext";
import { Editor } from "../Components/Editor";

export const CreatePost = () => {
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);

  const userName = userInfo?.username;

  const createNewPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

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

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        // value={files}
        onChange={(e) => setFiles(e.target.files)}
      />
      <Editor value={content} onChange={setContent} />
      <button>Submit Blog</button>
    </form>
  );
};
