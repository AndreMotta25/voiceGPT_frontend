import React from 'react'
import styles from './styles.module.css'
const Loading = () => {
  return (
    <div className={styles.containerLoading}>
        <span className={styles.dotFlashing}></span>
    </div>
  )
}

export default Loading