import React from 'react'
import logo from "../Assets/logo.png"
import styles from "../Styles/createaccsuccess.module.css"

const CreateAccSuccess = () => {
  return (
    <div className={styles["page"]}>
        <div className={styles["pagecontent"]}>
            <div className={styles["title"]}>
                <img className={styles["pagelogo"]} src={logo} alt="logo"></img>
                <div className={styles["titletext"]}>
                    <label>Orbital 22</label>
                    <label>A Software Development Project</label>
                    <label>By Team Kite Flyers</label>
                </div>
            </div>
            <div className={styles["contentbox"]}>
                <div className={styles["header"]}>
                    <label>Successfully created account!</label>
                    <label>Login <a href={'/'}>here</a>.</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateAccSuccess