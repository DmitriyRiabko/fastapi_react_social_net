import React, { useState } from "react";
import { Modal, Box, Button, Input } from "@mui/material";
import { useSignUpStore } from "../../store/popup";
import { useForm } from "react-hook-form";
import { authService } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import styles from "./SignUpWindow.module.scss";
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
  borderRadius: "10px",
};

export default function SignUpWindow() {
  const { isOpen, setClose } = useSignUpStore();
  const {setAuth} = useAuthUser()

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: (formData) => authService.signIn(formData),
  });

  const { mutate, error, isError } = useMutation({
    mutationFn: (formData) => authService.signUp(formData),
    onSuccess: (data) => {
      const { email, ...loginData } = getValues();
      loginMutation.mutate(loginData);
      setClose(), reset(), setAuth(data);
    },
  });

  const sendFormData = (data) => {
    mutate(data);
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
            {...register("username", {
              required: "Required Field",
            })}
            placeholder="Username"
            className={styles.email}
          />
          {errors.username && (
            <div className={styles.error}>{errors.username.message}</div>
          )}

          <Input
            type="email"
            {...register("email", {
              required: "Required Field",
            })}
            placeholder="Email"
            className={styles.password}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}

          <Input
            type="password"
            {...register("password", {
              required: "Required Field",
            })}
            placeholder="Password"
            className={styles.password}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}

          {isError && (
            <div style={{ color: "red" }}>
              {" "}
              {error.response?.data?.detail || "Something wrong"}
            </div>
          )}

          <Button type="submit" variant="outlined" className={styles.submit}>
            Register
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
