import styles from "./App.module.scss";
import { Post } from "./components/post/Post";
import Header from "./components/header/Header";
import { useQuery } from "@tanstack/react-query";
import { postService } from "./services/post.service";
import SignInWindow from "./components/signIn-window/SignInWindow";
import SignUpWindow from "./components/signUp-window/SignUpWindow";
import NewPostWindow from "./components/newPost-window/NewPostWindow";

function App() {
  const { data: posts } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => postService.getAllPosts(),
  });

  return (
    <div className={styles.app}>
      <SignUpWindow />
      <SignInWindow />
      <NewPostWindow />
      <div className={styles.wrapper}>
        <Header />
        <section className={styles.posts_container}>
          {posts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
