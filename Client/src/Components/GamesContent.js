import React from 'react'
import styles from "../Styles/games.module.css"
import tpiece from "../Assets/tpiece.jpg"
import snake from "../Assets/snake.jpg"
import typing from "../Assets/typing.jpg"
import imgholder from "../Assets/bg.png"

const GamesContent = () => {

  return (
    <div>
      <div className={styles["pagecontent"]}>

        <div className={styles["gamesbigtitle"]}>
          Games List
        </div>

        <div className={styles["gamesbox"]}>

          <a href="/games/tetris" className={styles["adivforgame"]}>
            <div className={styles["game"]}>
              <div><img src={tpiece} className={styles["gameimg"]}></img></div>
              <div className={styles["gametitle"]}>
                Tetris Line Clear 40L
              </div>
            </div>
          </a>

          <a href="#" className={styles["adivforgame"]}>
            <div className={styles["game"]}>
              <div><img src={snake} className={styles["gameimg"]}></img></div>
              <div className={styles["gametitle"]}>
                Snake Battle
              </div>
            </div>
          </a>

          <a href="#" className={styles["adivforgame"]}>
            <div className={styles["game"]}>
              <div><img src={typing} className={styles["gameimg"]}></img></div>
              <div className={styles["gametitle"]}>
                Typing Speed Demon
              </div>
            </div>
          </a>

          <a href="#" className={styles["adivforgame"]}>
            <div className={styles["game"]}>
              <div><img src={imgholder} className={styles["gameimg"]}></img></div>
              <div className={styles["gametitle"]}>
                TO BE ANNOUNCED
              </div>
            </div>
          </a>

        </div>
      </div>

    </div>
  )
}

export default GamesContent