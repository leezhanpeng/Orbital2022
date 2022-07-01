import React, { useState, useEffect } from 'react'

import styles from "../Styles/homepage.module.css"
import welcomeimg from "../Assets/welcome.png"
import helloimg from "../Assets/hello.jpg"
import { useCookies } from 'react-cookie';

import profilepictest from "../Assets/testprofilepic.png"
import profilepictest2 from "../Assets/baseprofilepic.png"

const HomepageContent = () => {
  
  const [newsletter, setNews] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/all-newsletters');
      const jsonResult = await result.json();
      setNews(jsonResult);
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


              <div className={styles["profile"]}>
                <label className={styles["ranknumber"]}>1</label>
                <img src={profilepictest2} className={styles["profilepic"]} alt={"profileimg"}></img>
                <label className={styles["username"]}>fazerunner1</label>
                <label className={styles["recordtime"]}>01:14.85</label>
              </div>

              <div className={styles["profile"]}>
                <label className={styles["ranknumber"]}>2</label>
                <img src={profilepictest} className={styles["profilepic"]} alt={"profileimg"}></img>
                <label className={styles["username"]}>jenniferchue</label>
                <label className={styles["recordtime"]}>01:15.25</label>
              </div>

              <div className={styles["profile"]}>
                <label className={styles["ranknumber"]}>3</label>
                <img src={profilepictest2} className={styles["profilepic"]} alt={"profileimg"}></img>
                <label className={styles["username"]}>bigtower</label>
                <label className={styles["recordtime"]}>01:19.44</label>
              </div>

              <div className={styles["profile"]}>
                <label className={styles["ranknumber"]}>4</label>
                <img src={profilepictest} className={styles["profilepic"]} alt={"profileimg"}></img>
                <label className={styles["username"]}>MaxxxBurner</label>
                <label className={styles["recordtime"]}>01:21.70</label>
              </div>

              <div className={styles["profile"]}>
                <label className={styles["ranknumber"]}>5</label>
                <img src={profilepictest2} className={styles["profilepic"]} alt={"profileimg"}></img>
                <label className={styles["username"]}>asdfgamer</label>
                <label className={styles["recordtime"]}>01:21.98</label>
              </div>

            </div>

            
          

        </div>

        <div className={styles["newsbox"]}>
          <div className={styles["newsheader"]}>
            Newsletter
          </div>



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