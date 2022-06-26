import React, { useState, useEffect } from 'react'

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js'

import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../Styles/gamepages/typing.module.css";

function Typing() {

  const [auth, setAuth] = useState([{"allowaccess": false}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/authentication');
      const jsonResult = await result.json();
      
      setAuth(jsonResult);
    }

    fetchData();
  }, []);

  const { unityProvider } = useUnityContext({
    loaderUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.loader.js",
    dataUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.data",
    frameworkUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.framework.js",
    codeUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.wasm",
  });

  if (auth[0].allowaccess)
  {

    return (
      <div>
        <Navbar />
          <div className={styles["client"]}>
            <Unity unityProvider={unityProvider} className={styles["typing"]}/>
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
export default Typing