import React from 'react'
import logo from "../Assets/logo.png"
import styles from "../Styles/signuppage.module.css"

const DupUsernameSignup = () => {
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
                <div className={styles["signupbox"]}>
                    <div className={styles["header"]}>
                        Sign up
                    </div>
                    <div className={styles["badcred"]}>
                        Username already taken. Try a different one.
                    </div>
                    <form className={styles["form"]} action={'/new-user'} method={"POST"}>
                        <div className={styles["inputs"]}>
                            <div className={styles["input"]}>
                                <input id="email" name="email" className={styles["inputbox"]} type={"email"} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder={"Email"} required></input>
                            </div>
                            <div className={styles["input"]}>
                                <input id="username" name="username" className={styles["inputbox"]} type={"text"} placeholder={"Username (Max 12 Char.)"} maxlength = "12" required></input>
                            </div>
                            <div className={styles["input"]}>
                                <input id="password" name="password" className={styles["inputbox"]} type={"password"} placeholder={"Password"} required></input>
                            </div>
                            <div className={styles["invisinput"]}>
                                <input id="dp" name="dp" type={"text"} value={""} readOnly></input>
                            </div>
                            <div className={styles["invisinput"]}>
                                <input id="title" name="title" type={"text"} value={"Player"} readOnly></input>
                            </div>
                            <div className={styles["invisinput"]}>
                                <input id="bios" name="bios" type={"text"} value={""} readOnly></input>
                            </div>
                        </div>
                        <button className={styles["btn"]}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
      )
}

export default DupUsernameSignup