import React, { Component, useState, useEffect } from 'react'
import styles from "../Styles/homepage.module.css"
import welcomeimg from "../Assets/welcome.png"
import helloimg from "../Assets/hello.jpg"

const HomepageContent = () => {

  const [news, setNews] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/all-newsletters');
      const jsonResult = await result.json();

      setNews(jsonResult);
    }

    fetchData();

  }, []);



  return (
    <div>
      <div className={styles["pagecontent"]}>


        <div className={styles["welcomebox"]}>
          <a className={styles["welcomeboxtext"]}>
            Hello, NAME!
          </a>
        </div>


        <div className={styles["newsbox"]}>
          <a className={styles["newsheader"]}>
            NEWSLETTER
          </a>



          {
          news.map((news) => (
          <div key={news.id} className={styles["news"]}>
            <div><img src={news.imagebase64} className={styles["newsimg"]}></img></div>

            <div className={styles["newstext"]}>

              <a className={styles["newstitle"]}>
                {news.title}
              </a>
              <a className={styles["newscontent"]}>
                {news.content}
              </a>

            </div>
          </div>
          ))
          }



          <div key={"fakeid1"} className={styles["news"]}>
            <div><img src={helloimg} className={styles["newsimg"]}></img></div>

            <div className={styles["newstext"]}>

              <a className={styles["newstitle"]}>
                Say hi to the developers!
              </a>
              <a className={styles["newscontent"]}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </a>

            </div>
          </div>



          <div key={"fakeid2"} className={styles["news"]}>
            <div><img src={welcomeimg} className={styles["newsimg"]}></img></div>

            <div className={styles["newstext"]}>

              <a className={styles["newstitle"]}>
                Welcome to PlayFab!
              </a>
              <a className={styles["newscontent"]}>
              Hello players! The website is currently in progress. Hope you are as excited as we are in the completion of this project!
              </a>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default HomepageContent