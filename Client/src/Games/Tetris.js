import React, { useState, useEffect } from 'react'

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js';
import CheckAuth from '../Pages/CheckAuth.js';

import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../Styles/gamepages/tetris.module.css";

function Tetris() {

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
    loaderUrl: "../TetrisBuild/WebGLBuildTetris.loader.js",
    dataUrl: "../TetrisBuild/WebGLBuildTetris.data",
    frameworkUrl: "../TetrisBuild/WebGLBuildTetris.framework.js",
    codeUrl: "../TetrisBuild/WebGLBuildTetris.wasm",
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
            <Unity unityProvider={unityProvider} className={styles["tetris"]}/>
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
export default Tetris