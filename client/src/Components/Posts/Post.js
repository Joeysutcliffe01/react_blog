import { format } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Posts({
  _id,
  title,
  summary,
  createdAt,
  cover,
  content,
  author,
}) {
  return (
    <>
      <motion.section
        className="post_section"
        // initial={{ opacity: 0 }}
        // animate={{
        //   opacity: 1,
        //   transition: { duration: 1 },
        // }}
        // exit={{ opacity: 0 }}
      >
        {/* ---------------------------------- post 1*/}
        <div className="posts">
          <Link to={`/post/${_id}`}>
            <img src={"http://localhost:4000/" + cover} alt="react post" />
            <div className="posts_info">
              <h2 className="posts_info_h2 textoverflow">{title}</h2>

              <span className="post_auther_info_name">
                {author &&
                  "@" +
                    author.username.charAt(0).toUpperCase() +
                    author.username.slice(1)}
              </span>
              <time className="post_auther_info_date">
                {format(new Date(createdAt), "MMM d yyyy, HH:MM")}
              </time>

              <p className="post_auther_info_summary ">{summary}</p>
            </div>
          </Link>
        </div>

        {/* ---------------------------------- post 2*/}
      </motion.section>
    </>
  );
}
