import React from "react";
import styles from "./NewComment.module.scss";
import { useForm } from "react-hook-form";
import { Input, Button } from "@mui/material";
import { SendHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../../services/post.service";
import { useAuthUser } from "../../store/user";

export function NewComment({ post_id }) {
  const { user } = useAuthUser();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (comment) =>
      postService.commentPost(comment, user?.access_token),
    onSuccess: () => queryClient.invalidateQueries(["allPosts"]),
  });

  const sendComment = (data) => {
    mutate({
      username: user?.username,
      text: data.comment,
      post_id: post_id,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(sendComment)} className={styles.form}>
      <Input
        placeholder="comment..."
        className={styles.comment}
        {...register("comment")}
      />
      <Button className={styles.submit} type="submit">
        <SendHorizontal />
      </Button>
    </form>
  );
}
