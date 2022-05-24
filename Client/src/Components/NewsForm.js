import React from 'react'
import styles from "../Styles/newsform.module.css"


const NewsForm = () => {
  return (
    <div>
        <div className={styles["pagecontent"]}>
            <div className={styles["formbox"]}>
                <div className={styles["header"]}>
                    Newsletter form for administrators only.
                </div>
                <form className={styles["form"]} action={'/add-newsletter'} method={"POST"}>
                    
                    <div className={styles["input"]}>
                        <label>Newsletter Title:</label>
                        <input id="title" name="title" className={styles["titlebox"]} type={"text"} required></input>
                    </div>
                    <div className={styles["input"]}>
                        <label>Newsletter Content:</label>
                        <textarea id="content" name="content" className={styles["textbox"]} type={"text"} required></textarea>
                    </div>
                    <button className={styles["btn"]}>Upload</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewsForm