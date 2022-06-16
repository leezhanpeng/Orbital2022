import React from 'react'
import styles from "../Styles/games.module.css"
import tpiece from "../Assets/tpiece.jpg"
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
              <div><img src={imgholder} className={styles["gameimg"]}></img></div>
              <div className={styles["gametitle"]}>
                TO BE CONFIRMED
              </div>
            </div>
          </a>

          <a href="#" className={styles["adivforgame"]}>
            <div className={styles["game"]}>
              <div><img src={imgholder} className={styles["gameimg"]}></img></div>
              <div className={styles["gametitle"]}>
                TO BE CONFIRMED
              </div>
            </div>
          </a>

        </div>
      </div>

    </div>
  )
}

export default GamesContent