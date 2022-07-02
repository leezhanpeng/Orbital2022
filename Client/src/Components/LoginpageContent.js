import React from 'react'
import logo from "../Assets/logo.png"
import styles from "../Styles/loginpage.module.css"

const LoginPageContent = () => {

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
            <div className={styles["info"]}>
                As at 8:38pm, 2nd July, we have deleted all accounts that were created before. Please create a new one. Thank you.
            </div>
            <div className={styles["loginbox"]}>
                <div className={styles["header"]}>
                    Login
                </div>
                <form className={styles["form"]} action={'/user-login'} method={"POST"}>
                    <div className={styles["inputs"]}>
                        <div className={styles["input"]}>
                            <input id="username" name="username" className={styles["inputbox"]} type={"text"} placeholder={"Username"} required></input>
                        </div>
                        <div className={styles["input"]}>
                            <input id="password" name="password" className={styles["inputbox"]} type={"password"} placeholder={"Password"} required></input>
                        </div>
                    </div>
                    <button className={styles["btn"]}>Login</button>
                    <div className={styles["bottomtext"]}>
                        Do not have an account? <a href="/signup">Sign up</a> now!
                    </div>
                    <div className={styles["bottomtext"]}>
                        <a href={"#"}>Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPageContent