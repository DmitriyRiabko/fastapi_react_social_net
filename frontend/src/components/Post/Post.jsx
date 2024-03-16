import styles from "./Post.module.scss";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Post({ post }) {
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post.image_url_type == "absolute") {
      setImageUrl(post.image_url);
    } else {
      setImageUrl("http://localhost:5555/" + post.image_url);
    }
  }, []);

  useEffect(() => {
    setComments(post.comments);
  });

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <FaUserCircle size={"1.7em"} />
        <h4>{post?.user?.username}</h4>
        <button className={styles.delete}>Delete</button>
      </header>

      <div className={styles.image_container}>
        <img src={imageUrl} alt="" className={styles.image} />
      </div>
      <div className={styles.info_container}>
        <h4 className={styles.post_caption}>{post.caption}</h4>
        <div className={styles.post_comments}>
          {comments.map((comment) => (
            <div>
              <span
                className={styles.comment_creator}
              >{`${comment.username}:`}</span>
              <span className={styles.comment_text}>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
