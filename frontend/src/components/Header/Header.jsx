import React from "react";
import styles from "./Header.module.scss";
import { Tent } from "lucide-react";
import { Button } from "@mui/material";
import { useSignInStore } from "../../store";

export default function Header() {
  
  const {setOpen, isOpen} = useSignInStore()
  
  console.log(isOpen);

  return (
    <header className={styles.header}>
      <div className={styles.title_block}>
        <Tent size={28} color="white" />
        <h1 className={styles.title}>React+FastApi</h1>
      </div>
      <div className={styles.buttons_block}>
        <Button className={styles.signIn} onClick={()=>setOpen()} variant="outlined">Sign In</Button>
        <Button className={styles.signUp} variant="outlined">Sign Up</Button>
      </div>
    </header>
  );
}
