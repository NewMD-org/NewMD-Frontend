import { useCallback } from "react";
import styles from "./Modal.module.css";


export function Modal({ setShowDetail }) {
    const closeModal = useCallback(_ => {
        setShowDetail(false);
    }, [setShowDetail]);

    return (
        <div className={styles.modal_container}>
            <div className={styles.spinner} onClick={() => closeModal()}></div>
        </div>
    );
}