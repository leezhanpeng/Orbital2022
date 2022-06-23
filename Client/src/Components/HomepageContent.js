import React, { useState, useEffect } from 'react'

import styles from "../Styles/homepage.module.css"
import welcomeimg from "../Assets/welcome.png"
import helloimg from "../Assets/hello.jpg"
import { useCookies }from 'react-cookie';

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
            Hello, {usernameDisplay(0)}!
          </div>
        </div>


        <div className={styles["newsbox"]}>
          <div className={styles["newsheader"]}>
            NEWSLETTER
          </div>



          {
          newsletter.map((news, index) => (
          <a href='/home' key={index} className={styles["news"]}>

            <div ><img src={news.imagebase64} className={styles["newsimg"]} alt={"newletterimg"}></img></div>

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



          <a href='/home' key={"fakeid1"} className={styles["news"]}>
            <div><img src={helloimg} className={styles["newsimg"]} alt={"newletterimg"}></img></div>

            <div className={styles["newstext"]}>

              <div className={styles["newstitle"]}>
                Say hi to the developers!
              </div>
              <div className={styles["newscontent"]}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </div>

            </div>
          </a>



          <a href='/home' key={"fakeid2"} className={styles["news"]}>
            <div><img src={welcomeimg} className={styles["newsimg"]} alt={"newletterimg"}></img></div>

            <div className={styles["newstext"]}>

              <div className={styles["newstitle"]}>
                Welcome to PlayFab!
              </div>
              <div className={styles["newscontent"]}>
              Hello players! The website is currently in progress. Hope you are as excited as we are in the completion of this project!
              </div>

            </div>
          </a>
        </div>

      </div>

    </div>
  )
  
}

export default HomepageContent;