import React, { useState, useEffect } from 'react';
import styles from "../Styles/addfriend.module.css";
import { useCookies } from 'react-cookie';

const FriendReqSent = () => {

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
            
            <div className={styles["titles"]}>
                <a href={"/friendslist"} className={styles["listtitle"]}>
                Friends List
                </a>
                <a href={"/addfriend"} className={styles["addtitle"]}>
                Add friend
                </a>
            </div>
            <div className={styles["addfriendbox"]}>
                <div className={styles["usernotexist"]}>
                    User does not exist.
                </div>
                <form className={styles["form"]} action={'/add-friend'} method={"POST"}>
                    <div className={styles["input"]}>
                        <input id="to" name="to" className={styles["inputbox"]} type={"text"} placeholder={"Username (Max 12 Char.)"} maxLength = "12" required></input>
                    </div>
                    <div className={styles["invisinput"]}>
                        <input id="from" name="from" type={"text"} value={username()} readOnly></input>
                    </div>
                    <button className={styles["btn"]}>Add Friend</button>
                </form>
                <div className={styles["notetext"]}>
                    Note: Do not worry about duplicate usernames, they are all unique!
                </div>
            </div>
        </div>

    </div>
    )
}

export default FriendReqSent