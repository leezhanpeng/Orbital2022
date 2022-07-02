import React from "react";
import { useCookies } from 'react-cookie';
import styles from "../Styles/changeprofileform.module.css";

const ChangeBioContent = () => {
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
    
      const [cookies] = useCookies();
    
      const username = () => {
        return parseJwt(cookies.accesstoken).username;
      }

  return (
    <div>
            <div className={styles["pagecontent"]}>
                <div className={styles["formbox"]}>
                    <form className={styles["form"]} action={'/change-bios'} method={"POST"}>
                        <div className={styles["input"]}>
                            <label className={styles["titles"]}>Edit biography:</label>
                            <textarea id="bios" name="bios" className={styles["bios"]} type={"text"} maxlength = "100" required></textarea>                  
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="username" name="username" type={"text"} readOnly value={username()}></input>
                        </div>
                        <button className={styles["btn"]}>Upload</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ChangeBioContent