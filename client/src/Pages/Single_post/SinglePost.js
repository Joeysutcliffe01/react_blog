import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Components/UserContext/UserContext";

export const SinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  console.log("----------userInfo----------", userInfo);

  // const { title, summary, author, content, cover, createdAt, updatedAt } =
  //   postInfo;

  console.log("postInfo", postInfo);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((resInfo) => {
        setPostInfo(resInfo);
      });
    });
  }, []);

  console.log();

  if (!postInfo) return "";

  return (
    <section className="single_post_section">
      <div className="single_post_hero">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover" />
        {userInfo.id === postInfo.author._id && <h2>Edit</h2>}
        <h3>{"@" + postInfo.author.username}</h3>
        <time className="">
          {format(new Date(postInfo.createdAt), "MMM d yyyy, HH:MM")}
        </time>
        <h2>{postInfo.title}</h2>
      </div>
      <section className="single_post_content">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </section>
    </section>
  );
};
