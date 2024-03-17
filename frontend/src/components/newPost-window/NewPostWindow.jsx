import React, { useState } from "react";
import { Modal, Box, Button, Input } from "@mui/material";
import { useNewPostWindow } from "../../store/popup";
import { useForm } from "react-hook-form";
import { authService } from "../../services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./NewPostWindow.module.scss";
import { Tent } from "lucide-react";
import { useAuthUser } from "../../store/user";
import { postService } from "../../services/post.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function NewPostWindow() {
  const {user} = useAuthUser();
  const { isOpen, setClose } = useNewPostWindow();
  const queryClient = useQueryClient()
  

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const newPostMutation  = useMutation({
    mutationFn:(data)=> postService.createPost(data, user?.access_token),
    onSuccess:() =>  queryClient.invalidateQueries(['allPosts'])
  })



  const { mutate, error, isError } = useMutation({
    mutationFn: (image)=> postService.sendImage(image,user?.access_token),
    onSuccess: (data) => {
        newPostMutation.mutate({
            "image_url": data?.filename,
            "image_url_type": "relative",
            "caption": getValues('caption'),
            "creator_id": user?.user_id
        })
        reset(), setClose();
    },
    onError: (error)=> console.log(error),
    
  });




  const sendFormData = (data) => {
    mutate(data.file[0]);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        reset(), setClose();
      }}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
          <Tent size={40} />
          <Input
            placeholder="Enter caption here..."
            className={styles.caption}
            {...register("caption", {
              required: "Required Field",
            })}
          />
          {errors.caption && (
            <div className={styles.error}>{errors.caption.message}</div>
          )}

          <Input
            type="file"
            className={styles.file}
            accept="image/*"
            {...register("file", {
              required: "Required Field",
            })}
          />
          {errors.file && (
            <div className={styles.error}>{errors.file.message}</div>
          )}

          {isError && (
            <div style={{ color: "red" }}>
              {" "}
              {error.response?.data?.detail || "Something wrong"}
            </div>
          )}

          <Button type="submit" variant="outlined" className={styles.submit}>
            Create Post
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
