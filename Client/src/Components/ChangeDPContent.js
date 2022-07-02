import React, {useState} from "react";
import { useCookies } from 'react-cookie';
import styles from "../Styles/changeprofileform.module.css";

const ChangeDPContent = () => {

    function resizeImage(base64Str, maxWidth = 150, maxHeight = 150) {
        return new Promise((resolve) => {
          let img = new Image()
          img.src = base64Str
          img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height
      
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
          }
        })
      }

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
    
      const [cookies] = useCookies();
    
      const username = () => {
        return parseJwt(cookies.accesstoken).username;
      }

      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const [encoded, setEncoded] = useState("");

    const handleUpload = async (event) => {
        var base64 = await convertBase64(event.target.files[0]);
        resizeImage(base64).then((result) => {
            setEncoded(result);
        });
    }


  return (
    <div>
            <div className={styles["pagecontent"]}>
                <div className={styles["formbox"]}>
                    <form className={styles["form"]} action={'/change-dp'} method={"POST"}>
                        <div className={styles["input"]}>
                            <label className={styles["titles"]}>Upload New Display Picture:</label>
                            <input id="imgname" name="imgname" className={styles["imguploadbtn"]} type={"file"} onChange={handleUpload} required></input>                  
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="dp" name="dp" type={"text"} readOnly value={encoded}></input>
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="username" name="username" type={"text"} readOnly value={username()}></input>
                        </div>
                        <button className={styles["btn"]}>Upload</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ChangeDPContent