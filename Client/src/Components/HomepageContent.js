import React, { useState, useEffect } from 'react'

import styles from "../Styles/homepage.module.css"
import { useCookies } from 'react-cookie';

import profile from "../Assets/profilelogo.png";
import baseProfilePic from "../Assets/baseprofilepic.png";
import profilepictest2 from "../Assets/testprofilepic.png"


const HomepageContent = () => {
  
  const [newsletter, setNews] = useState([]);
  const [loadingnews, setLoadingNews] = useState([true]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/all-newsletters');
      const jsonResult = await result.json();
      setNews(jsonResult);
      setLoadingNews([]);
    }

    fetchData();

  }, []);

  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  const [cookies] = useCookies();

  const usernameDisplay = () => {
    return parseJwt(cookies.accesstoken).username;
  }

  const [tetrisRec, setTetrisRec] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
      const result = await fetch('/tetris-records');
      const jsonResult = await result.json();
      let tetris = jsonResult.map(timeToMS).filter(x => x.MS !== 0);
      tetris = tetris.sort(compare).slice(0,10);
      setTetrisRec(tetris);
  }
      fetchData();
  });

  function timeToMS(tetObj)
  {
    if (tetObj.recordTime !== "NIL")
    {
      const times = tetObj.recordTime.split(":");
      const secs = times[1].split(".");
      tetObj.MS = parseInt(times[0])*60*100 + parseInt(secs[0])*100 + parseInt(times[1]);
    }
    else
    {
      tetObj.MS = 0;
    }
    return (tetObj);
  }

  function compare(a, b) {
    if ( a.MS < b.MS ){
      return -1;
    }
    if ( a.MS > b.MS ){
      return 1;
    }
    return 0;
  }

  const [DPs, setDPs] = useState([{dp: profilepictest2}]);

    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/all-dp');
        const jsonResult = await result.json();
        setDPs(jsonResult);
    }
        fetchData();
    });
  
  return (
    <div>
      <div className={styles["pagecontent"]}>


        <div className={styles["welcomebox"]}>
          <div className={styles["welcomeboxtext"]}>
            Hello, {usernameDisplay()}!
          </div>
        </div>

        <div className={styles["centercontent"]}>

        <div className={styles["leaderboard"]}>
          <div className={styles["leaderboardheader"]}>
            Global Leaderboard
          </div>
          
            <div className={styles["tetrisleaderboard"]}>
              <div className={styles["gameheader"]}>
                Tetris
              </div>
              {
                tetrisRec.map((rec, index) => (
                    <div key={index} className={styles["profile"]}>
                      <label className={styles["ranknumber"]}>{index + 1}</label>
                      <img src={DPs[0].dp} className={styles["profilepic"]}></img>
                      <label className={styles["username"]}>{rec.username}</label>
                      <label className={styles["recordtime"]}>{rec.recordTime}</label>
                      <div className={styles["profileiconholder"]}>
                          <a href={"/profile/" + rec.username}><img className={styles["profileicon"]} src={profile}></img></a>
                      </div>
                    </div>
                ))
              }

            </div>

            
          

        </div>

        <div className={styles["newsbox"]}>
          <div className={styles["newsheader"]}>
            Newsletter
          </div>
          {
            loadingnews.map((load, index) => (
              <div key={index} className={styles["loading"]}>
                Loading...
              </div>
            ))
          }


          {
            newsletter.map((news, index) => (
            <a href={'/newsletter/' + news.title} key={index} className={styles["news"]}>

              <div><img src={news.imagebase64} className={styles["newsimg"]} alt={"newletterimg"}></img></div>

              <div className={styles["newstext"]}>

                <div className={styles["newstitle"]}>
                  {news.title}
                </div>
                <div className={styles["newscontent"]}>
                  {news.content}
                </div>

              </div>

            </a>
            ))
          }
        </div>

        </div>

      </div>

    </div>
  )
  
}

export default HomepageContent;