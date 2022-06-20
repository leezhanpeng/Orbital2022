import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../Styles/gamepages/tetris.module.css";

function Tetris() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../Build/WebGLBuildTetris.loader.js",
    dataUrl: "../Build/WebGLBuildTetris.data",
    frameworkUrl: "../Build/WebGLBuildTetris.framework.js",
    codeUrl: "../Build/WebGLBuildTetris.wasm",
  });

  return (
  
    <div className={styles["client"]}>
      <Unity unityProvider={unityProvider} className={styles["tetris"]}/>
    </div>
  
  );
}
export default Tetris