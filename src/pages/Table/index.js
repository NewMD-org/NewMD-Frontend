import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { NavbarTop } from "./components/NavbarTop";
import { ClassesTable } from "./components/ClassesTable";
import { Loader } from "./components/Loader";
// import snowdrift from "./snowdrift.png";
import styles from "./Table.module.css";


const Table = ({ state, authorization }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Time Table | NewMD";
    }, []);

    return (
        <>
            <div className={styles.background}>
                {isLoading ? <Loader /> : <></>}
                <NavbarTop state={state} authorization={authorization} />
                <ClassesTable isLoading={isLoading} setIsLoading={setIsLoading} state={state} authorization={authorization} />
            </div>
        </>
    );
};

export function TablePage() {
    const { state } = useLocation();
    const authorization = localStorage.getItem("authorization");

    try {
        if (state != null) {
            return (<Table state={state ? state : null} authorization={authorization} />);
        }
        else {
            return (<Navigate to="/" />);
        }
    }
    catch (err) {
        console.log(err);
        localStorage.clear();
        cookie.remove("navigate");
        console.log("Catch error, clear local storage and cookie");
        return (<Navigate to="/" />);
    }
}