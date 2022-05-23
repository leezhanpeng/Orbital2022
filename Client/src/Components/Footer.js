import React from 'react'
import styles from "../Styles/footer.module.css"

const Footer = () => {
  return (  
    <div className={styles["footer"]}>
        <a className={styles["footercontent"]}>
        Made by Kite Flyers
        </a>
        <a className={styles["footercontent"]}>
        Orbital 2022 NUS
        </a>
    </div>
  )
}

export default Footer