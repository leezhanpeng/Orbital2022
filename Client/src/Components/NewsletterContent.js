import React, { useState, useEffect } from 'react';
import styles from "../Styles/newsletter.module.css";
import NILNewsletter from '../Pages/NILNewsletter.js';
import Loading from '../Pages/LoadingPage.js';

const NewsletterContent = () => {

    const [newsletter, setNews] = useState(["loading"]);
    const hrefid = window.location.href.split("/").pop();
    let newsid = hrefid.replace(/%20/gi, " ");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/all-newsletters');
      const jsonResult = await result.json();
      const displayedNews = jsonResult.filter(x => x.title === newsid)
      setNews(displayedNews);
    }

    fetchData();

  });

    if (newsletter.length === 0)
    {
      return (
        <div>
          <NILNewsletter />
        </div>
      )
    }
    else if (newsletter[0] === "loading")
    {
      return (
        <div>
          <Loading />
        </div>
      )
    }
    return (
        <div>
            <div className={styles["pagecontent"]}>
                    {
                        newsletter.map((news, index) => (
                            <div key={index} className={styles["news"]}>
                                <div className={styles["newstitle"]}>
                                    {news.title}
                                </div>
                                <img src={news.imagebase64} className={styles["newsimg"]} alt={"newletterimg"}></img>

                                <div className={styles["newscontent"]}>
                                    {news.content + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}     
                                </div>

                            </div>
                        ))
                    }

                </div>
        </div>
      )
}

export default NewsletterContent