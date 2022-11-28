import { Navigate } from "react-router-dom";
import cookie from "react-cookies";
import styles from "./Logout.module.css";
import { useEffect } from "react";


export function LogoutPage() {
    console.log("Manual logout : start");
    localStorage.clear();
    cookie.remove("navigate");
    console.log("Clear local storage and cookie");
    console.log("Manual login : success");

    useEffect(() => {
        document.title = "Logout | NewMD";
    }, []);

    return (
        <>
            <div className={styles.background}></div>
            <Navigate to="/" />
        </>
    );
}