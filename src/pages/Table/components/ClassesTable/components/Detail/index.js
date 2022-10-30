import { useCallback } from "react";
import styles from "./Detail.module.css";


export function Detail({ setShowDetail }) {
    const closeDetail = useCallback(event => {
        setShowDetail(false);
    }, [setShowDetail]);

    return (
        <div className={styles.detail_container}>
            <div className={styles.spinner} onClick={() => closeDetail()}></div>
        </div>
    );
}