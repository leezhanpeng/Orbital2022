import React from 'react'
import logo from "../Assets/logo.png"
import styles from "../Styles/pagenotfound.module.css"

const PageNotFound = () => {
  return (
    <div className={styles["page"]}>
        <div className={styles["pagecontent"]}>
            <a href={"/"} className={styles["title"]}>
                <img className={styles["pagelogo"]} src={logo} alt="logo"></img>
                <div className={styles["titletext"]}>
                    <label>Orbital 22</label>
                    <label>A Software Development Project</label>
                    <label>By Team Kite Flyers</label>
                </div>
            </a>
            <div className={styles["contentbox"]}>
                <div className={styles["header"]}>
                    <label>Sorry, page not found.</label>
                    <label>Did you input the wrong link?</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound