import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import NILProfile from '../Pages/NILProfile.js';
import Loading from '../Pages/LoadingPage.js';
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

    const [displayedProfile, setDisplayedProfile] = useState(["loading"]);
    const [personalProfile, setPersonalProfile] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/all-profile');
        const jsonResult = await result.json();
        const profile = jsonResult.filter(x => x.username === username)
        setDisplayedProfile(profile);
        if (profile.length > 0)
        {
            if (profile[0].username === accountUsername())
            {
                setPersonalProfile(true);
            }
        }
    }

        fetchData();

    });

    const [DP, setDP] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/all-dp');
        const jsonResult = await result.json();
        const profiledp = jsonResult.filter(x => x.username === username)
        if (profiledp.length !== 0)
        {
            if (profiledp[0].dp === "")
            {
                setDP(baseProfilePic);
            }
            else
            {
                setDP(profiledp[0].dp);
            }
        }
    }
        fetchData();
    });

    const [tetrisRec, setTetrisRec] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/tetris-records');
        const jsonResult = await result.json();
        const tetris = jsonResult.filter(x => x.username === username)
        if (tetris.length !== 0)
        {
            setTetrisRec(tetris[0]);
        }
    }
        fetchData();
    });

    const [typingRec, setTypingRec] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/typing-records');
        const jsonResult = await result.json();
        const typing = jsonResult.filter(x => x.username === username)
        if (typing.length !== 0)
        {
            setTypingRec(typing[0]);
        }
    }
        fetchData();
    });

    const [snakeRec, setSnakeRec] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/snake-records');
        const jsonResult = await result.json();
        const snake = jsonResult.filter(x => x.username === username)
        if (snake.length !== 0)
        {
            setSnakeRec(snake[0]);
        }
    }
        fetchData();
    });

    const personalProfileCheck = [];
    if (personalProfile)
    {
        personalProfileCheck.push(true);
    }
    
    if (displayedProfile.length === 0)
    {
      return (
        <div>
          <NILProfile />
        </div>
      )
    }
    else if (displayedProfile[0] === "loading")
    {
        return (
            <div>
            <Loading />
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
                                <img src={DP} className={styles["dp"]} alt={"dp"}></img>
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
                    <label className={styles["statstitle"]}>Tetris Line Clear 40L</label>
                    <label className={styles["statscontent"]}>Total Wins - {tetrisRec.tetrisWins}</label>
                    <label className={styles["statscontent"]}>Fastest 40L - {tetrisRec.recordTime}</label>
                    <label className={styles["statscontent"]}>Career 40L Finished - {tetrisRec.total40LinesFinished}</label>
                    <label className={styles["statscontent"]}>Career Lines Cleared - {tetrisRec.totalLinesCleared}</label>
                    <label className={styles["statscontent"]}>Career Tetrises 4L Cleared - {tetrisRec.tetrisesCleared}</label>
                </div>
                <div className={styles["statsinfo"]}>
                    <label className={styles["statstitle"]}>Typing Speed Demon</label>
                    <label className={styles["statscontent"]}>Total Wins - {typingRec.typingWins}</label>
                    <label className={styles["statscontent"]}>Record Words Per Minute - {typingRec.recordWPM}</label>
                    <label className={styles["statscontent"]}>Career Words Cleared - {typingRec.wordsCleared}</label>
                </div>
                <div className={styles["statsinfo"]}>
                    <label className={styles["statstitle"]}>Snake Battle</label>
                    <label className={styles["statscontent"]}>Total Wins - {snakeRec.snakeWins}</label>
                    <label className={styles["statscontent"]}>Fastest 20 Jewels - {snakeRec.recordTime}</label>
                    <label className={styles["statscontent"]}>Longest Length - {snakeRec.recordLength}</label>
                    <label className={styles["statscontent"]}>Career Jewels Collected - {snakeRec.jewelsCollected}</label>
                    <label className={styles["statscontent"]}>Career Sabotages Given - {snakeRec.sabosGiven}</label>
                    <label className={styles["statscontent"]}>Career Power Ups Received - {snakeRec.powerupsReceived}</label>
                </div>
            </div>
        </div>
    )
}

export default ProfilepageContent