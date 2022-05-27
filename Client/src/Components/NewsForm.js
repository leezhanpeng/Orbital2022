import React, {useState} from "react";
import styles from "../Styles/newsform.module.css";

const NewsForm = () => {

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
        setEncoded(base64);
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