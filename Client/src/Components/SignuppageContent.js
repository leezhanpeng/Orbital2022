import React from 'react'
import logo from "../Assets/logo.png"
import styles from "../Styles/signuppage.module.css"

const SignuppageContent = () => {
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
            <div className={styles["signupbox"]}>
                <div className={styles["header"]}>
                    Sign up
                </div>
                <form className={styles["form"]} action={'/new-user'} method={"POST"}>
                    <div className={styles["inputs"]}>
                        <div className={styles["input"]}>
                            <input id="email" name="email" className={styles["inputbox"]} type={"text"} placeholder={"Email"} required></input>
                        </div>
                        <div className={styles["input"]}>
                            <input id="username" name="username" className={styles["inputbox"]} type={"text"} placeholder={"Username"} required></input>
                        </div>
                        <div className={styles["input"]}>
                            <input id="password" name="password" className={styles["inputbox"]} type={"password"} placeholder={"Password"} required></input>
                        </div>
                    </div>
                    <button className={styles["btn"]}>Sign up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignuppageContent