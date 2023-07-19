import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  // const createPost = () => {
  //   const data = new FormData();

  //   data.set("title", title);
  //   data.set("summary", summary);
  //   data.set("content", content);
  //   // data.set("file", )
  // };

  const createNewPost = (e) => {
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    // data.set("file", )

    e.preventDefault();

    fetch("http://localhost:4000/create_post", {
      method: "POST",
    });
  };

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
        value={files}
        onChange={(e) => setFiles(e.target.files)}
      />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(e) => setContent(e)}
      />
      <button>Submit Blog</button>
    </form>
  );
};
