import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../Styles/gamepages/tetris.module.css";

function Tetris() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../Build/WebGLBuild.loader.js",
    dataUrl: "../Build/WebGLBuild.data",
    frameworkUrl: "../Build/WebGLBuild.framework.js",
    codeUrl: "../Build/WebGLBuild.wasm",
  });

  return (
  
    <div className={styles["client"]}>
      <Unity unityProvider={unityProvider} className={styles["tetris"]}/>
    </div>
  
  );
}
export default Tetris