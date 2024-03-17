import React from "react";
import styles from "./Header.module.scss";
import { Tent } from "lucide-react";
import { CirclePlus } from "lucide-react";

import { Button } from "@mui/material";
import { useNewPostWindow, useSignInStore } from "../../store/popup";
import { useSignUpStore } from "../../store/popup";

import { useAuthUser } from "../../store/user";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const sigInStore = useSignInStore();
  const signUpStore = useSignUpStore();
  const newPostStore = useNewPostWindow();

  const { isAuth, user, logout } = useAuthUser();

  const store = useAuthUser();

  return (
    <header className={styles.header}>
      <div className={styles.title_block}>
        <Tent size={28} color="white" />
        <h1 className={styles.title}>React+FastApi</h1>
      </div>
      <div className={styles.buttons_block}>
        {isAuth ? (
          <>
            <CirclePlus
              className={styles.newPost_btn}
              size={"1.9em"}
              onClick={() => {
                newPostStore.setOpen();
              }}
            />
            <FaUserCircle className={styles.icon} size={"1.7em"} />
            <h3 className={styles.user}>{user?.username}</h3>
            <Button
              className={styles.logout}
              variant="outlined"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              className={styles.signIn}
              onClick={() => sigInStore.setOpen()}
              variant="outlined"
            >
              Sign In
            </Button>
            <Button
              className={styles.signUp}
              variant="outlined"
              onClick={() => signUpStore.setOpen()}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
