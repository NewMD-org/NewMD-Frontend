import { useEffect, useRef, useState } from "react";
import { Chinese } from "./components/Chinese";
import { English } from "./components/English";
import styles from "./Message.module.css";


export function Message() {
    const [language, setLanguage] = useState(false);

    const switch_button = useRef(null);

    useEffect(() => {
        switch_button.current.setAttribute("data-content", language ? "English" : "英文");
    }, [language]);

    return (
        <article className={styles.markdown_body}>
            <div className={styles.switch_container}>
                <div className={styles.switch_button} ref={switch_button}>
                    <input className={styles.switch_button_checkbox} type="checkbox" onChange={(e) => setLanguage(e.target.checked)}></input>
                    <label className={styles.switch_button_label} htmlFor=""><span className={styles.switch_button_label_span}>{language ? "Chinese" : "中文"}</span></label>
                </div>
            </div>
            {language ? (
                <English />
            ) : (
                <Chinese />
            )}
        </article>
    );
}