import React, {useState} from "react";
import styles from "../Styles/newsform.module.css";

const NewsForm = () => {

    function resizeImage(base64Str, maxWidth = 250, maxHeight = 150) {
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
                    <div className={styles["header"]}>
                        Newsletter form for administrators only.
                    </div>
                    <form className={styles["form"]} action={'/add-newsletter'} method={"POST"}>
                        
                        <div className={styles["input"]}>
                            <label className={styles["titles"]}>Newsletter Title:</label>
                            <input id="title" name="title" className={styles["titlebox"]} type={"text"} required></input>
                        </div>
                        <div className={styles["input"]}>
                            <label className={styles["titles"]}>Newsletter Content:</label>
                            <textarea id="content" name="content" className={styles["textbox"]} type={"text"} required></textarea>
                        </div>
                        <div className={styles["input"]}>
                            <label className={styles["titles"]}>Newsletter Image:</label>
                            <input id="imgname" name="imgname" className={styles["imguploadbtn"]} type={"file"} onChange={handleUpload} required></input>                  
                        </div>
                        <div className={styles["invisinput"]}>
                            <input id="imagebase64" name="imagebase64" type={"text"} readOnly value={encoded}></input>
                        </div>
                        <button className={styles["btn"]}>Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewsForm