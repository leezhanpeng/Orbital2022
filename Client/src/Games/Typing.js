import React, { useState, useEffect, useCallback } from 'react'

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js';
import CheckAuth from '../Pages/CheckAuth.js';

import { Unity, useUnityContext } from "react-unity-webgl";
import { useCookies } from 'react-cookie';
import styles from "../Styles/gamepages/typing.module.css";

function Typing() {

  const [auth, setAuth] = useState([{"allowaccess": "checking"}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/authentication');
      const jsonResult = await result.json();
      
      setAuth(jsonResult);
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

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.loader.js",
    dataUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.data",
    frameworkUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.framework.js",
    codeUrl: "../TypingBuild/WebGLBuildTypingSpeedDemon.wasm",
  });

  function showUsername() {
    sendMessage("PressPlay", "AddName", usernameDisplay());
  }

  const handleGameOver = useCallback((WPM, wordsTyped, pos) => {
    document.getElementById("wpm").value = WPM;
    document.getElementById("wordstyped").value = wordsTyped;
    document.getElementById("pos").value = pos;
    document.getElementById("typrec").submit();
    setTimeout(stopWindow, 2000);
  }, []);


  useEffect(() => {
    addEventListener("SendWPM", handleGameOver);
    return () => {
      removeEventListener("SendWPM", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  function stopWindow() {
    window.stop();
  }

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
            <Unity unityProvider={unityProvider} className={styles["typing"]}/>
            {
              showUsername()
            }
              <form action={'/update-typing-records'} method={"POST"} id={"typrec"}>
                <div className={styles["invisinput"]}>
                  <input id="username" name="username" type={"text"} readOnly value={usernameDisplay()}></input>                
                </div>
                <div className={styles["invisinput"]}>
                  <input id="wpm" name="wpm" type={"text"} readOnly value={0}></input>
                </div>
                <div className ={styles["invisinput"]}>
                  <input id="wordstyped" name="wordstyped" type={"text"} readOnly value={0}></input>
                </div>
                <div className ={styles["invisinput"]}>
                  <input id="pos" name="pos" type={"text"} readOnly value={0}></input>
                </div>
            </form>
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