import logo from "../Assets/logo.png"
import profilelogo from "../Assets/profilelogo.png"
import gamelogo from "../Assets/gamelogo.png"
import friendlogo from "../Assets/friendlogo.png"
import forumlogo from "../Assets/forumlogo.png"
import styles from "../Styles/navbar.module.css"
const Navbar = () => {
  return (
    <div className={styles["navbar"]}>
        <a href="/"><img className={styles["weblogo"]} src={logo} alt="logo"></img></a>

        <form className={styles["search"]}>
          <input className={styles["searchinput"]} type="search" placeholder="Search for game..."></input>
          <button className={styles["searchbutton"]}><svg className={styles["searchbuttonimg"]} viewBox="0 0 1024 1024"><path d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg></button>
        </form>

        <nav className={styles["nav-nav"]}>
            <ul className={styles["navicons"]}>
                <li><a href="/profile"><img className={styles["navlogo"]} src={profilelogo} alt="profilelogo"></img></a></li>
                <li><a href="/games"><img className={styles["navlogo"]} src={gamelogo} alt="gamelogo"></img></a></li>
                <li><a><img className={styles["navlogo"]} src={friendlogo} alt="friendlogo"></img></a></li>
                <li><a><img className={styles["navlogo"]} src={forumlogo} alt="forumlogo"></img></a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar