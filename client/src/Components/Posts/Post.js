import { format } from "date-fns";

export function Posts({ title, summary, createdAt, cover, content, author }) {
  // console.log("title", title, "summary", summary);

  // console.log("author.username----------", author.username);
  return (
    <>
      <section className="post_section">
        {/* ---------------------------------- post 1*/}
        <div className="posts">
          <img src={"http://localhost:4000/" + cover} alt="react post" />
          <div className="posts_info">
            <h2>{title}</h2>
            <a href="/" className="post_auther_info_link">
              <span className="post_auther_info_name">
                {author &&
                  "@" +
                    author.username.charAt(0).toUpperCase() +
                    author.username.slice(1)}
              </span>
              <time className="post_auther_info_date">
                {format(new Date(createdAt), "MMM d yyyy, HH:MM")}
              </time>
            </a>
            <p>
              We'd like to offer the React community an option to adopt
              individual new features as soon as their design is close to final,
              before they're released in a stable
            </p>
          </div>
        </div>

        {/* ---------------------------------- post 2*/}
      </section>
    </>
  );
}
