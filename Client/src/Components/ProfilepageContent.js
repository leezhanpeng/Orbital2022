import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import PageNotFound from '../Pages/PageNotFound.js';
import styles from '../Styles/profilepage.module.css'

import baseProfilePic from "../Assets/baseprofilepic.png"
import angel from "../Assets/angel.jpg"

const ProfilepageContent = () => {
    const hrefid = window.location.href.split("/").pop();
    let username = hrefid.replace(/%20/gi, " ");

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
    
      const [cookies] = useCookies();
    
      const accountUsername = () => {
        return parseJwt(cookies.accesstoken).username;
      }

    const [displayedProfile, setDisplayedProfile] = useState([]);
    const [profilePresent, setProfilePresent] = useState(false);
    const [personalProfile, setPersonalProfile] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/all-profile');
        const jsonResult = await result.json();
        const profile = jsonResult.filter(x => x.username === username)
        setDisplayedProfile(profile);
        if (profile.length > 0)
        {
            setProfilePresent(true);
            if (profile[0].dp === "")
            {
                profile[0].dp = baseProfilePic;
            }
            if (profile[0].username === accountUsername())
            {
                setPersonalProfile(true);
            }
        }
    }

        fetchData();

    });

    const personalProfileCheck = [];
    if (personalProfile)
    {
        personalProfileCheck.push(true);
    }
    
    if (!profilePresent)
    {
      return (
        <div>
          <PageNotFound />
        </div>
      )
    }
    return (
        <div className={styles["pagecontent"]}>
            <div className={styles["topcontent"]}>
                <label className={styles["title"]}>Player Info</label>
                {
                    personalProfileCheck.map((checker, index) => (
                        <div key={index} className={styles["buttons"]}>
                        <a href="/changedisplaypic"><button className={styles["btn"]}>Change Display Pic</button></a>
                        <a href="/changebiography"><button className={styles["btn"]}>Change Biography</button></a>
                        </div>
                    ))
                }
            </div>
            <div className={styles["profilebox"]}>
                    {
                        displayedProfile.map((profile, index) => (
                        <div key={index} className={styles["topbox"]}>
                            <div className={styles["maininfo"]}>
                                <img src={profile.dp} className={styles["dp"]} alt={"dp"}></img>
                                <div className={styles["infotext"]}>
                                    <label className={styles["username"]}>{profile.username}</label>
                                    <label className={styles["profiletitle"]}>{profile.title}</label>
                                </div>
                            </div>
                            <div className={styles["biography"]}>
                                <label className={styles["profilebios"]}>{profile.bios}</label>
                            </div>  
                        </div>                    
                        ))
                    }
            </div>
            <div className={styles["rankbox"]}>
                <label className={styles["ranklabel"]}>Rank</label>
                <img src={angel} className={styles["rankpic"]} alt={"rankpic"}></img>
                <label className={styles["rankname"]}>Angels Divine</label>
            </div>
            <div className={styles["statisticsbox"]}>
                <label className={styles["statisticslabel"]}>Statistics</label>
                <div className={styles["statsinfo"]}>
                    <label className={styles["statstitle"]}>Tetris</label>
                    <label className={styles["statscontent"]}>Fastest 40L - 1:30.61</label>
                    <label className={styles["statscontent"]}>Career Lines Cleared - 6523</label>
                    <label className={styles["statscontent"]}>Career Tetrises 4L Cleared - 524</label>
                    <label className={styles["statscontent"]}>Career T-spins Done - 129</label>
                </div>
                <div className={styles["statsinfo"]}>
                    <label className={styles["statstitle"]}>Snake</label>
                    <label className={styles["statscontent"]}>Career Jewels Collected - 1235</label>
                    <label className={styles["statscontent"]}>Career Opponents Eliminated - 51</label>
                    <label className={styles["statscontent"]}>Maximum Length Obtained - 42U</label>
                </div>
            </div>
        </div>
    )
}

export default ProfilepageContent