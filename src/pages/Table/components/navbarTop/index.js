import { Link } from "react-router-dom";
import cookie from "react-cookies";
import "./index.css";
import { useState } from "react";


function removeCookie() {
    cookie.remove("navigate");
    console.log("Cookie removed");
}

export function NavbarTop() {
    // const defaultRememberMe = localStorage.getItem("authorization") ? jwt_decode(localStorage.getItem("authorization")).rememberMe === "true" ? true : false : false;

    // const [rememberMe, setRememberMe] = useState(defaultRememberMe.toString());
    return (
        <nav className="navbarTop">
            <Link to="/" className="navbarTop_title noselect" onClick={removeCookie}>
                NewMD
            </Link>
            <ul>
                <li>
                    <div className="pretty p-switch p-fill navbarTop_saveData noselect">
                        {/* <input type="checkbox" name="rememberMe" onChange={(e) => setRememberMe(e.target.checked ? "true" : "false")} defaultChecked={defaultRememberMe} /> */}
                        <input type="checkbox" />
                        <div className="state">
                            <label>Save Data</label>
                        </div>
                    </div>
                </li>
                <li className="navbarTop_logout  noselect">
                    <Link to="/logout">
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
}