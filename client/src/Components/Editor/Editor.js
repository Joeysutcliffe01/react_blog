import React from "react";
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

export const Editor = ({ value, onChange }) => {
  return (
    <>
      <ReactQuill
        value={value}
        modules={modules}
        formats={formats}
        onChange={onChange}
        style={{
          width: "92%",
          borderRadius: "1rem",
          backgroundColor: "white",
          overflow: "hidden",
          // border: "3px solid rgb(231, 231, 231)",
        }}
      />
    </>
  );
};
