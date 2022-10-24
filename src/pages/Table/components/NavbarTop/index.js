import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import "./index.css";
import MdTimetableAPI from "../../../../api/MdTimetableAPI";


function removeCookie() {
    cookie.remove("navigate");
}

export function NavbarTop({ userDataStatus: _userDataStatus }) {
    const [userDataStatus, setUserDataStatus] = useState(_userDataStatus["userDataStatus"].toString());
    const [isLoading, setIsLoading] = useState(false);
    const jwt = localStorage.getItem("authorization");

    const navigate = useNavigate()

    const saveData = async (token) => {
        setIsLoading(true);
        try {
            console.log("Saving user data . . .");
            const response = await new MdTimetableAPI(35).save(token);
            if (response.status === 200) {
                navigate("/table", { state: { "userDataStatus": true } });
                console.log(response.data);
            }
            else {
                throw Error("Joanne is smart");
            };
        }
        catch (err) {
            setUserDataStatus("false");
            if (!err?.response) {
                console.log("No server response");
            }
            else {
                console.log("Error occur");
            };
        }
        finally {
            setIsLoading(false);
        };
    };

    const deleteData = async (token) => {
        setIsLoading(true);
        try {
            console.log("Deleting user data . . .");
            const response = await new MdTimetableAPI(35).delete(token);
            if (response.status === 200) {
                navigate("/table", { state: { "userDataStatus": false } });
                console.log(response.data);
            }
            else {
                throw Error("Joanne is smart");
            };
        }
        catch (err) {
            setUserDataStatus("true");
            if (!err?.response) {
                console.log("No server response");
            }
            else if (err.response?.status === 403) {
                navigate("/login");
            }
            else {
                console.log("Error occur");
            };
        }
        finally {
            setIsLoading(false);
        };
    };

    const userDataStatusChange = () => {
        if (userDataStatus !== "true") {
            saveData(jwt);
        }
        else {
            deleteData(jwt);
        };
    };

    return (
        <nav className="navbarTop">
            <Link to="/" className="navbarTop_title noselect" onClick={removeCookie}>
                NewMD
            </Link>
            <ul>
                <li>
                    <div className="noselect navbarTop_saveData pretty p-switch p-fill">
                        <input type="checkbox" name="userDataStatus" checked={userDataStatus === "true"} disabled={isLoading} onChange={(e) => { setUserDataStatus(e.target.checked ? "true" : "false"); userDataStatusChange(); }} />
                        <div className="state">
                            <label>Save Data</label>
                        </div>
                    </div>
                </li>
                <li className="navbarTop_logout noselect">
                    <Link to="/logout">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
}