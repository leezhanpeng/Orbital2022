import React from "react";
import logo from "../Assets/logo.png"
import styles from "../Styles/signuppage.module.css"

const SignuppageContent = () => {

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
                <form className={styles["form"]} action={'/new-user'} method={"POST"}>
                    <div className={styles["inputs"]}>
                        <div className={styles["input"]}>
                            <input id="email" name="email" className={styles["inputbox"]} type={"email"} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder={"Email"} required></input>
                        </div>
                        <div className={styles["input"]}>
                            <input id="username" name="username" className={styles["inputbox"]} type={"text"} placeholder={"Username (Max 12 Char.)"} maxLength = "12" required></input>
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


                        <div className={styles["invisinput"]}>
                            <input id="recordTime" name="recordTime" type={"text"} value={"NIL"} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="tetrisWins" name="tetrisWins" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="total40LinesFinished" name="total40LinesFinished" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="totalLinesCleared" name="totalLinesCleared" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="tetrisesCleared" name="tetrisesCleared" type={"number"} value={0} readOnly></input>
                        </div>


                        <div className={styles["invisinput"]}>
                            <input id="typingWins" name="typingWins" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="recordWPM" name="recordWPM" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="wordsCleared" name="wordsCleared" type={"number"} value={0} readOnly></input>
                        </div>


                        <div className={styles["invisinput"]}>
                            <input id="snakeWins" name="snakeWins" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="recordLength" name="recordLength" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="jewelsCollected" name="jewelsCollected" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="sabosGiven" name="sabosGiven" type={"number"} value={0} readOnly></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="powerupsReceived" name="powerupsReceived" type={"number"} value={0} readOnly></input>
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