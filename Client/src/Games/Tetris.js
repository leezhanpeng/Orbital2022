import React, { useState, useEffect, useCallback } from 'react'

import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';
import NotLoggedIn from '../Pages/NotLoggedIn.js';
import CheckAuth from '../Pages/CheckAuth.js';

import { Unity, useUnityContext } from "react-unity-webgl";
import { useCookies } from 'react-cookie';
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
    loaderUrl: "../TetrisBuild/WebGLBuildTetris.loader.js",
    dataUrl: "../TetrisBuild/WebGLBuildTetris.data",
    frameworkUrl: "../TetrisBuild/WebGLBuildTetris.framework.js",
    codeUrl: "../TetrisBuild/WebGLBuildTetris.wasm",
  });

  function showUsername() {
    sendMessage("PlayerNetwork", "Name", usernameDisplay());
  }

  const [tetrisRec, setTetrisRec] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch('/tetris-records');
        const jsonResult = await result.json();
        const tetris = jsonResult.filter(x => x.username === usernameDisplay())
        if (tetris.length !== 0)
        {
            setTetrisRec(tetris[0]);
        }
    }
        fetchData();
    });

  function showRecord() {
    sendMessage("PlayerNetwork", "Record", tetrisRec.recordTime);
  }

  
  const handleGameOver = useCallback((timeFinished, ClearedLines, ClearedGame, fourLinesCleared) => {
    document.getElementById("finaltime").value = timeFinished;
    document.getElementById("finalclearedlines").value = ClearedLines;
    document.getElementById("clearedgame").value = ClearedGame;
    document.getElementById("fourlinescleared").value = fourLinesCleared;
    document.getElementById("tetrec").submit();
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
            {
              showUsername()
            }
            {
              showRecord()
            }
            <form action={'/update-tetris-records'} method={"POST"} id={"tetrec"}>
                <div className={styles["invisinput"]}>
                  <input id="username" name="username" type={"text"} readOnly value={usernameDisplay()}></input>                
                </div>
                <div className={styles["invisinput"]}>
                  <input id="finaltime" name="finaltime" type={"text"} readOnly value={"DNS"}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="finalclearedlines" name="finalclearedlines" type={"number"} readOnly value={0}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="clearedgame" name="clearedgame" type={"number"} readOnly value={0}></input>
                </div>
                <div className={styles["invisinput"]}>
                  <input id="fourlinescleared" name="fourlinescleared" type={"number"} readOnly value={0}></input>
                </div>
            </form>
            <form action={'/update-tetris-records'} method={"POST"} id={"winrec"}>
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
export default Tetris