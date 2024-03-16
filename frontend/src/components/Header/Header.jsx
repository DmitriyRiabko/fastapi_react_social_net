import React from 'react'
import styles from './Header.module.scss'

export default function Header () {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>React Social Network</h1>
    </div>
  )
}
