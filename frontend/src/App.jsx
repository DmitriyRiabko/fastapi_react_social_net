import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";
import { useQuery } from "@tanstack/react-query";
import { postService } from "./services/post.service";

function App() {
  const {data:posts, isLoading, error } = useQuery({
    queryKey:['allPosts'],
    queryFn: ()=> postService.getAllPosts()
  })
  return (
    <div className={styles.app}>
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
