import { format } from "date-fns";
import { Link } from "react-router-dom";

export function Posts({
  _id,
  title,
  summary,
  createdAt,
  cover,
  content,
  author,
}) {
  // console.log("title", title, "summary", summary);

  // console.log("author.username----------", author.username);
  return (
    <>
      <section className="post_section">
        {/* ---------------------------------- post 1*/}
        <Link to={`/post/${_id}`}>
          <div className="posts">
            <img src={"http://localhost:4000/" + cover} alt="react post" />
            <div className="posts_info">
              <h2>{title}</h2>

              <span className="post_auther_info_name">
                {author &&
                  "@" +
                    author.username.charAt(0).toUpperCase() +
                    author.username.slice(1)}
              </span>
              <time className="post_auther_info_date">
                {format(new Date(createdAt), "MMM d yyyy, HH:MM")}
              </time>

              <p>
                We'd like to offer the React community an option to adopt
                individual new features as soon as their design is close to
                final, before they're released in a stable
              </p>
            </div>
          </div>
        </Link>

        {/* ---------------------------------- post 2*/}
      </section>
    </>
  );
}
