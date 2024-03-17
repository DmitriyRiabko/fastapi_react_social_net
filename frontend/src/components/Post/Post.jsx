import { useQuery } from "@tanstack/react-query";
import styles from "./Post.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { postService } from "../../services/post.service";
import { useAuthUser } from "../../store/user";

export  function Post({ post }) {
  const imageUrl = postService.getPostImage(
    post?.image_url,
    post?.image_url_type
  );

  const { user } = useAuthUser();

  

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <div className={styles.user}>
          <FaUserCircle size={"1.7em"} />
          <h4>{post?.user?.username}</h4>
        </div>
        {user?.username === post?.user?.username && (
          <button className={styles.delete}>Delete</button>
        )}
      </header>

      <div className={styles.image_container}>
        <img src={imageUrl} alt="" className={styles.image} />
      </div>
      <div className={styles.info_container}>
        <h4 className={styles.post_caption}>{post.caption}</h4>
        <div className={styles.post_comments}>
          {post.comments.map((comment, id) => (
            <div key={id}>
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
