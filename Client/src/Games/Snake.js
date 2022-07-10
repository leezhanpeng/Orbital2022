import React, { useState, useEffect } from 'react'

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js';
import CheckAuth from '../Pages/CheckAuth.js';

import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../Styles/gamepages/snake.module.css";

function Snake() {

  const [auth, setAuth] = useState([{"allowaccess": "checking"}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/authentication');
      const jsonResult = await result.json();
      
      setAuth(jsonResult);
    }

    fetchData();
  }, []);

  const { unityProvider } = useUnityContext({
    loaderUrl: "../SnakeBuild/WebGLBuildSnake.loader.js",
    dataUrl: "../SnakeBuild/WebGLBuildSnake.data",
    frameworkUrl: "../SnakeBuild/WebGLBuildSnake.framework.js",
    codeUrl: "../SnakeBuild/WebGLBuildSnake.wasm",
  });

  if (auth[0].allowaccess === "checking")
  {
    return (
      <div>
        <CheckAuth />
      </div>
    )
  }
  else if (auth[0].allowaccess)
  {
    return (
      <div>
        <Navbar />
          <div className={styles["client"]}>
            <Unity unityProvider={unityProvider} className={styles["snake"]}/>
          </div>
        <Footer />
      </div>
    
    );
  }

  else {
    return (
      <NotLoggedIn />
    )
  }

}
export default Snake