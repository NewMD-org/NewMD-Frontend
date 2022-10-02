import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import cookie from "react-cookies";
import MdTimetableAPI from "../../api/MdTimetableAPI.js";
import {TablePage} from "../Table";
import logo from "./logo.svg";
import background from "./background.svg";
import "./index.css";


async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}

const Login = () => {
    const IDRef = useRef();
    const PWDRef = useRef();
    const errRef = useRef();
    const defaultRememberMe = localStorage.getItem("authorization") ? jwt_decode(localStorage.getItem("authorization")).rememberMe === "true" ? true : false : false;

    const [ID, setID] = useState(defaultRememberMe ? jwt_decode(localStorage.getItem("authorization")).userID : "");
    const [PWD, setPWD] = useState(defaultRememberMe ? jwt_decode(localStorage.getItem("authorization")).userPWD : "");
    const [rememberMe, setRememberMe] = useState(defaultRememberMe.toString());
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
    });

    useEffect(() => {
        IDRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [ID, PWD, rememberMe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // await sleep(3000); // Must be remove before publish

        if (ID === "") {
            setLoading(false);
            IDRef.current.focus();
            return setErrMsg("Missing Username.");
        }
        else if (PWD === "") {
            setLoading(false);
            IDRef.current.focus();
            return setErrMsg("Missing Password.");
        };

        try {
            const response = await new MdTimetableAPI(5).login(ID, PWD, rememberMe);
            localStorage.setItem("authorization", response.headers.authorization);
            cookie.save("navigate", "true", { path: "/" });
            setID("");
            setPWD("");
            setRememberMe("");
            setSuccess(true);
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response.");
            }
            else if (err.response?.status === 400) {
                setErrMsg(err.response?.data);
            }
            else if (err.response?.status === 401) {
                setErrMsg(err.response?.data);
            }
            else if (err.response?.status === 500) {
                setErrMsg(err.response?.data);
            }
            else {
                setErrMsg("Unexpected Error.");
            };
            localStorage.clear();
            cookie.remove("navigate");
            errRef.current.focus();
        };
        setLoading(false);
    };

    return (
        <>
            {success ? (
                <Navigate to="/table" />
                // <TablePage />
            ) : (
                <>
                    <div className="Login">
                        <div className="Login_background" style={{ backgroundImage: `url(${background})` }}></div>
                        <div className="Login_top">
                            <img alt="logo" src={logo} className="Login_logo" />
                        </div>
                        <div className="Login_bottom">
                            <div className="Login_center">
                                <p ref={errRef} className={errMsg ? "Login_errmsg" : "Login_offscreen"} aria-live="assertive">{errMsg}</p>
                                <form className="Login_form" onSubmit={handleSubmit}>
                                    <div className="Login_textfield">
                                        <input type="text" name="ID" ref={IDRef} value={ID} onChange={(e) => setID(e.target.value)} placeholder="Username" />
                                        <span className="Login_text_focusEffect"></span>
                                    </div>
                                    <div className="Login_textfield">
                                        <input type="password" name="PWD" ref={PWDRef} value={PWD} onChange={(e) => setPWD(e.target.value)} placeholder="Password" />
                                        <span className="Login_text_focusEffect"></span>
                                    </div>
                                    <div className="pretty p-default p-curve Login_rememberme">
                                        <input type="checkbox" name="rememberMe" onChange={(e) => setRememberMe(e.target.checked ? "true" : "false")} defaultChecked={defaultRememberMe} />
                                        <div className="state p-success-o">
                                            <label>Remember me for 7 days</label>
                                        </div>
                                    </div>
                                    <div className="Login_centerDiv">
                                        {isLoading ? (
                                            <button className="Login_signin" style={{ "cursor": "not-allowed" }} disabled>
                                                <span className="spinner-border" aria-hidden="true"></span>
                                            </button>
                                        ) : (
                                            <button className="Login_signin">Sign in</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export function LoginPage() {
    // const navigate = useNavigate();
    try {
        if (localStorage.getItem("authorization")) {
            if (jwt_decode(localStorage.getItem("authorization")).exp <= (new Date().getTime() / 1000)) {
                localStorage.clear();
                cookie.remove("navigate");
                return (<Login />);
            }
            else {
                if (cookie.load("navigate") === "true") {
                    return <Navigate to="/table"/>
                }
                else {
                    cookie.remove("navigate");
                    return (<Login />);
                };
            };
        }
        else {
            localStorage.clear();
            cookie.remove("navigate");
            return (<Login />);
        };
    }
    catch (err) {
        localStorage.clear();
        cookie.remove("navigate");
        return (<Login />);
    };
}