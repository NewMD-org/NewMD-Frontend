import { Navigate } from "react-router-dom";
import cookie from "react-cookies";
import styles from "./Logout.module.css";


export function LogoutPage() {
    localStorage.clear();
    cookie.remove("navigate");
    console.log("Clear local storage and cookie");

    return (
        <>
            <div className={styles.background}></div>
            <Navigate to="/" />
        </>
    );
}