import { Navigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { BrowserView, MobileView } from 'react-device-detect';
import { NavbarTop } from "./components/NavbarTop";
import { ClassesTable } from "./components/ClassesTable";
import "./index.css";


const Table = ({ userDataStatus }) => {
    return (
        <>
            <BrowserView>
                <div className="TablePage_background">
                    <NavbarTop userDataStatus={userDataStatus} />
                    <ClassesTable />
                </div>
            </BrowserView >
            <MobileView>
                <h1>Not finish yet</h1>
            </MobileView>
        </>
    );
}

export function TablePage() {
    const { state } = useLocation();

    try {
        const userDataStatus = state ? state : null;
        if (userDataStatus != null) {
            return (<Table userDataStatus={userDataStatus} />);
        }
        else {
            return (<Navigate to="/" />);
        };
    }
    catch (err) {
        console.log(err);
        localStorage.clear();
        cookie.remove("navigate");
        console.log("Catch error, clear local storage and cookie");
        return (<Navigate to="/" />);
    };
}