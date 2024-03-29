import React, { useState } from "react";
import { Modal, Box, Button, Input } from "@mui/material";
import { useSignInStore } from "../../store/popup";
import { useForm } from "react-hook-form";
import { authService } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import styles from "./SignInWindow.module.scss";
import { Tent } from "lucide-react";
import { useAuthUser } from "../../store/user";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius:'10px'
};

export default function SignInWindow() {

  const setAuth = useAuthUser(state=>state.setAuth)

  const { isOpen, setClose } = useSignInStore();

  const {register,handleSubmit,reset,formState: { errors }} = useForm();

  const {mutate, error, isError} = useMutation({
    mutationFn: (formData) => authService.signIn(formData),
    onSuccess: (data) => {setAuth(data),setClose(),reset()},
  });

  const sendFormData = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    mutate(formData);
  };

  return (
    <Modal open={isOpen} onClose={() => {reset(),setClose()}}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
          <Tent size={40}/>
          <Input
            {...register("username", {
              required: "Required Field",
            })}
            placeholder="Username"
            className={styles.email}
          />
          {errors.username && <div className={styles.error}>{errors.username.message}</div>}

          <Input
            type="password"
            {...register("password", {
              required: "Required Field",
            })}
            placeholder="Password"
            className={styles.password}
          />
          {errors.password && <div className={styles.error}>{errors.password.message}</div>}

          {isError && (
            <div style={{ color: "red" }}>
              {" "}
              {error.response?.data?.detail || "Something wrong"}
            </div>
          )}

          <Button type="submit" variant="outlined" className={styles.submit}>
            Enter
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
