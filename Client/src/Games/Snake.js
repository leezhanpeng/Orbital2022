import React, { useState, useEffect, useCallback } from 'react'

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js';
import CheckAuth from '../Pages/CheckAuth.js';

import { Unity, useUnityContext } from "react-unity-webgl";
import { useCookies } from 'react-cookie';
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
    loaderUrl: "../SnakeBuild/WebGLBuildSnake.loader.js",
    dataUrl: "../SnakeBuild/WebGLBuildSnake.data",
    frameworkUrl: "../SnakeBuild/WebGLBuildSnake.framework.js",
    codeUrl: "../SnakeBuild/WebGLBuildSnake.wasm",
  });

  function showUsername() {
    sendMessage("PlayerNetwork", "Name", usernameDisplay());
  }

  const [snakeRec, setSnakeRec] = useState({});
  useEffect(() => {
      const fetchData = async () => {
      const result = await fetch('/snake-records');
      const jsonResult = await result.json();
      const snake = jsonResult.filter(x => x.username === usernameDisplay())
      if (snake.length !== 0)
      {
          setSnakeRec(snake[0]);
      }
  }
      fetchData();
  });

  function showRecord() {
    sendMessage("PlayerNetwork", "Record", snakeRec.recordTime);
  }

  const handleGameOver = useCallback((timeFinished, RecordLength, JewelsCollected, SaboAmt, PowerUpGet) => {
    document.getElementById("finaltime").value = timeFinished;
    document.getElementById("longestlength").value = RecordLength;
    document.getElementById("totaljewels").value = JewelsCollected;
    document.getElementById("totalsabo").value = SaboAmt;
    document.getElementById("totalpower").value = PowerUpGet;
    document.getElementById("snkrec").submit();
  }, []);


  useEffect(() => {
    addEventListener("GameEnd", handleGameOver);
    return () => {
      removeEventListener("GameEnd", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  const handleAddWin = useCallback((winning) => {
    document.getElementById("wincount").value = winning;
    document.getElementById("winrec").submit();
  }, []);

  useEffect(() => {
    addEventListener("WinStats", handleAddWin);
    return () => {
      removeEventListener("WinStats", handleAddWin);
    };
  }, [addEventListener, removeEventListener, handleAddWin]);

  const onSubmit = (dataForm) => {
    dataForm.preventDefault();
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
            <Unity unityProvider={unityProvider} className={styles["snake"]}/>
            {
              showUsername()
            }
            {
              showRecord()
            }
            <form action={'/update-snake-records'} method={"POST"} id={"snkrec"} onSubmit={onSubmit}>
                <div className={styles["invisinput"]}>
                  <input id="username" name="username" type={"text"} readOnly value={usernameDisplay()}></input>                
                </div>
                <div className={styles["invisinput"]}>
                  <input id="finaltime" name="finaltime" type={"text"} readOnly value={"DNS"}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="longestlength" name="longestlength" type={"number"} readOnly value={0}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="totaljewels" name="totaljewels" type={"number"} readOnly value={0}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="totalsabo" name="totalsabo" type={"number"} readOnly value={0}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="totalpower" name="totalpower" type={"number"} readOnly value={0}></input>
                </div>
            </form>
            <form action={'/update-snake-records'} method={"POST"} id={"winrec"}  onSubmit={onSubmit}>
                <div className={styles["invisinput"]}>
                  <input id="username" name="username" type={"text"} readOnly value={usernameDisplay()}></input>                
                </div>
                <div className={styles["invisinput"]}>
                  <input id="wincount" name="wincount" type={"text"} readOnly value={0}></input>
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
export default Snake