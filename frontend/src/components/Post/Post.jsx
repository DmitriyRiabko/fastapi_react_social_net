import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./Post.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { postService } from "../../services/post.service";
import { useAuthUser } from "../../store/user";
import { NewComment } from "../new-comment/NewComment";

export  function Post({ post }) {
  const imageUrl = postService.getPostImage(
    post?.image_url,
    post?.image_url_type
  );

  const queryClient = useQueryClient()


  const { user, isAuth } = useAuthUser();


  const {mutate} = useMutation({
    mutationFn:(id)=> postService.deletePost(id, user.access_token),
    onSuccess:() =>  queryClient.invalidateQueries(['allPosts'])

  })

  

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <div className={styles.user}>
          <FaUserCircle size={"1.7em"} />
          <h4>{post?.user?.username}</h4>
        </div>
        {user?.username === post?.user?.username && (
          <button className={styles.delete} onClick={()=>mutate(post.id)}>Delete</button>
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
        {isAuth && <NewComment post_id = {post.id}/>}
      </div>
    </div>
  );
}
