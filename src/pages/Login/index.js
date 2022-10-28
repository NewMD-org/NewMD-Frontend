import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import cookie from "react-cookies";
import MdTimetableAPI from "../../api/MdTimetableAPI.js";
import { Loader } from "./components/Loader";
import logo from "./logo.svg";
import background from "./background.svg";
import styles from "./Login.module.css";


function isValidAuth() {
    try {
        return localStorage.getItem("authorization") ? JSON.stringify(Object.keys(jwt_decode(localStorage.getItem("authorization")))) === JSON.stringify(["userID", "userPWD", "rememberMe", "iat", "exp"]) ? true : false : false;
    }
    catch (err) {
        return false;
    };
}

function join(...array) {
    return array.join(" ");
}

const Login = () => {
    const IDRef = useRef();
    const PWDRef = useRef();
    const errRef = useRef();
    const defaultRememberMe = localStorage.getItem("authorization") ? jwt_decode(localStorage.getItem("authorization")).rememberMe === "true" ? true : false : false;

    const [ID, setID] = useState(defaultRememberMe ? jwt_decode(localStorage.getItem("authorization")).userID : "");
    const [PWD, setPWD] = useState(defaultRememberMe ? jwt_decode(localStorage.getItem("authorization")).userPWD : "");
    const [rememberMe, setRememberMe] = useState(defaultRememberMe.toString());
    const [userDataStatus, setUserDataStatus] = useState("false");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        IDRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [ID, PWD, rememberMe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
            const response = await new MdTimetableAPI(6).login(ID, PWD, rememberMe);
            if (response.data["error"] == null || response.data["userDataStatus"] === true) {
                cookie.save("navigate", "true", { path: "/" });
                localStorage.setItem("authorization", response.headers.authorization);
                setID("");
                setPWD("");
                setRememberMe("");
                setUserDataStatus(response.data["userDataStatus"]);
                setSuccess(true);
            }
            else {
                throw Error("joanne is smart");
            };
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

        return setLoading(false);
    };

    return (
        <>
            {success ? (
                <Navigate to="/table" state={{ "userDataStatus": userDataStatus }} />
            ) : (
                <>
                    <div className={join(styles.background, "noselect")} style={{ backgroundImage: `url(${background})` }}>
                        <div className={styles.top}>
                            <img alt="logo" src={logo} className={styles.logo} />
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.center}>
                                <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.textfield}>
                                        <input type="text" name="ID" ref={IDRef} value={ID} onChange={(e) => setID(e.target.value)} placeholder="Username" />
                                        <span className={styles.text_focusEffect}></span>
                                    </div>
                                    <div className={styles.textfield}>
                                        <input type="password" name="PWD" ref={PWDRef} value={PWD} onChange={(e) => setPWD(e.target.value)} placeholder="Password" />
                                        <span className={styles.text_focusEffect}></span>
                                    </div>
                                    <div className={join(styles.rememberme, "pretty", "p-default", "p-curve")}>
                                        <input type="checkbox" name="rememberMe" onChange={(e) => setRememberMe(e.target.checked ? "true" : "false")} defaultChecked={defaultRememberMe} />
                                        <div className={join("state", "p-success-o")}>
                                            <label>Remember me for 7 days</label>
                                        </div>
                                    </div>
                                    <div className={styles.centerDiv}>
                                        {isLoading ? (
                                            <button className={styles.signin} style={{ "cursor": "not-allowed" }} disabled>
                                                <span className="spinner-border" aria-hidden="true"></span>
                                            </button>
                                        ) : (
                                            <button className={styles.signin}>Sign in</button>
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
    var rememberMe = isValidAuth() ? jwt_decode(localStorage.getItem("authorization")).rememberMe === "true" ? true : false : false;
    const ID = rememberMe ? jwt_decode(localStorage.getItem("authorization")).userID : "";
    const PWD = rememberMe ? jwt_decode(localStorage.getItem("authorization")).userPWD : "";

    const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [userDataStatus, setUserDataStatus] = useState("false");

    const autoLogin = async () => {
        try {
            if (isValidAuth()) {
                if (jwt_decode(localStorage.getItem("authorization")).exp >= (new Date().getTime() / 1000) && rememberMe) {
                    console.log("Local storage authorization found");
                    if (cookie.load("navigate") === "true") {
                        console.log("Cookie navigate found");
                        rememberMe = rememberMe.toString();
                        const response = await new MdTimetableAPI(6).login(ID, PWD, rememberMe);
                        if (response.data["error"] == null || response.data["userDataStatus"] === true) {
                            localStorage.setItem("authorization", response.headers.authorization);
                            cookie.save("navigate", "true", { path: "/" });
                            setUserDataStatus(response.data["userDataStatus"]);
                            setLoading(false);
                            return setSuccess(true);
                        }
                        else {
                            throw Error("joanne is smart");
                        };

                    }
                    else {
                        cookie.remove("navigate");
                        console.log("Cookie navigate not found");
                        setLoading(false);
                        return setSuccess(false);
                    };
                }
                else {
                    throw new Error("Local storage authorization expired, clear local storage");
                };
            }
            else {
                throw new Error("Local storage authorization is invalid");
            };
        }
        catch (err) {
            console.log(err.message);
            console.log("Catch error, clear local storage and cookie");
            localStorage.clear();
            cookie.remove("navigate");
            setLoading(false);
            return setSuccess(false);
        };
    }

    useEffect(() => {
        autoLogin();
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                success ? (
                    <Navigate to="/table" state={{ "userDataStatus": userDataStatus }} />
                ) : (
                    <Login />
                )
            )}
        </>
    );
}