import styles from "./Loader.module.css";


export function Loader() {
    return (
        <div className={styles.loader_container}>
            <div className={styles.spinner_container}>
                <div className={styles.spinner}></div>
            </div>
            <div className={styles.text_area}>
                <p className={styles.title}>Waiting for too long ?</p>
                <p className={styles.content}>Try enabling the "Save Data" option !</p>
            </div>
        </div>
    );
}