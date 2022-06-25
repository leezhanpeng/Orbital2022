import React from 'react'
import logo from "../Assets/logo.png"
import styles from "../Styles/loggedout.module.css"
import { useCookies }from 'react-cookie';

const LoggedOut = () => {

    const removeCookie = useCookies()[2];
    removeCookie("accesstoken");

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
                    <label>You have successfully logged out.</label>
                    <label>Login <a href={'/'}>here</a>.</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoggedOut