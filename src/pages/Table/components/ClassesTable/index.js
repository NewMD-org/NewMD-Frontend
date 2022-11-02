import { useState, useEffect } from "react";
// import { isDesktop as isBigScreen } from "react-device-detect";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from "react-cookies";
import { Detail } from "./components/Detail";
import MdTimetableAPI from "../../../../api/MdTimetableAPI";
import styles from "./ClassesTable.module.css";


function join(...array) {
    return array.join(" ");
}

const shortenTableData = (data) => {
    var dataString = JSON.stringify(data);
    const replacements = [
        ["-", " "],
        ["技高課內社團", "課內社團"],
        ["Javascript", "JS"],
        ["\\(輔\\)", ""],
        ["全民國防教育", "國防"],
        ["國語文", "國文"],
        ["英語文", "英文"],
        ["英語會話", "ESL "],
        ["基本電學", "電學"],
        ["基礎電子", "電子"],
        ["電腦繪圖", "電繪"],
        ["團體活動\\(班會\\)", "班會"]
    ];

    for (let replacement of replacements) {
        dataString = dataString.replace(new RegExp(replacement[0], "gm"), replacement[1]);
    };

    return JSON.parse(dataString);
}

export function ClassesTable({ isLoading, setIsLoading, state, authorization }) {
    const [isBigScreen, setIsBigScreen] = useState(getWindowDimensions().width > 930);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState({ "name": null, "classID": null });
    const [tableData, setTableData] = useState({});
    const [showSat, setShowSat] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchData(authorization);
    }, []);

    useEffect(() => {
        if (location.state["tableData"] ? true : false) {
            setTableData(isBigScreen ? location.state["tableData"] : shortenTableData(location.state["tableData"]));
            setIsLoading(false);

            function handleResize() {
                setIsBigScreen(getWindowDimensions().width > 930);
                if (getWindowDimensions().width > 930) {
                    setTableData(state["tableData"]);
                }
                else {
                    setTableData(shortenTableData(state["tableData"]));
                };
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        };
    }, [location.state]);

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function checkSat(obj) {
        const classes = Object.keys(obj["day6"]);
        var haveData = false;
        for (let index of classes) {
            if (obj["day6"][index]["classname"] !== "") {
                haveData = true;
                break;
            };
        };
        return haveData;
    }

    const fetchData = async (token) => {
        setIsLoading(true);
        try {
            console.log("Getting table data . . .");
            if (state["userDataStatus"]) {
                const response = await new MdTimetableAPI(40).read(token);
                if (response.status === 200) {
                    setTableData(isBigScreen ? response.data["table"] : shortenTableData(response.data["table"]));
                    setShowSat(checkSat(response.data["table"]));
                    navigate("/table", { state: { "userDataStatus": state["userDataStatus"], "tableData": response.data["table"] }, replace: true });
                    console.log("Success");
                }
                else {
                    throw Error("Joanne is smart");
                };
            }
            else {
                const response = await new MdTimetableAPI(40).table(token);
                if (response.status === 200) {
                    setTableData(isBigScreen ? response.data["table"] : shortenTableData(response.data["table"]));
                    setShowSat(checkSat(response.data["table"]));
                    navigate("/table", { state: { "userDataStatus": state["userDataStatus"], "tableData": response.data["table"] }, replace: true });
                    console.log("Success");
                }
                else {
                    throw Error("Joanne is smart");
                };
            };
        }
        catch (err) {
            console.log(err);
            if (!err?.response) {
                console.log("No server response");
            }
            else {
                console.log(err.message);
            };
            cookie.remove("navigate");
            navigate("/");
        };
    }

    return (
        <div className={styles.container}>
            {showDetail ? <Detail setShowDetail={setShowDetail} setDetail={setDetail} detail={detail} /> : <></>}
            <table className={styles.table}>
                <thead>
                    <tr className={"noselect"}>
                        <th className={isBigScreen ? styles.topLeftIndex : styles.indexMobile} colSpan={isBigScreen ? "2" : "1"}></th>
                        <th className={join(styles.index, styles.days)}>MON</th>
                        <th className={join(styles.index, styles.days)}>TUE</th>
                        <th className={join(styles.index, styles.days)}>WED</th>
                        <th className={join(styles.index, styles.days)}>THU</th>
                        <th className={join(styles.index, styles.days)}>FRI</th>
                        {showSat ? (
                            <th className={join(styles.index, styles.days)}>SAT</th>
                        ) : (
                            <></>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>1</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>08:15<br />|<br />09:05</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["1"]["classname"], "classID": tableData["day1"]["1"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["1"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["1"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["1"]["classname"], "classID": tableData["day2"]["1"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["1"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["1"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["1"]["classname"], "classID": tableData["day3"]["1"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["1"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["1"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["1"]["classname"], "classID": tableData["day4"]["1"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["1"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["1"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["1"]["classname"], "classID": tableData["day5"]["1"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["1"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["1"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["1"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["1"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>2</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>09:15<br />|<br />10:05</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["2"]["classname"], "classID": tableData["day1"]["2"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["2"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["2"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["2"]["classname"], "classID": tableData["day2"]["2"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["2"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["2"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["2"]["classname"], "classID": tableData["day3"]["2"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["2"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["2"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["2"]["classname"], "classID": tableData["day4"]["2"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["2"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["2"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["2"]["classname"], "classID": tableData["day5"]["2"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["2"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["2"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["2"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["2"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>3</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>10:15<br />|<br />11:05</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["3"]["classname"], "classID": tableData["day1"]["3"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["3"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["3"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["3"]["classname"], "classID": tableData["day2"]["3"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["3"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["3"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["3"]["classname"], "classID": tableData["day3"]["3"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["3"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["3"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["3"]["classname"], "classID": tableData["day4"]["3"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["3"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["3"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["3"]["classname"], "classID": tableData["day5"]["3"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["3"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["3"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["3"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["3"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>4</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>11:15<br />|<br />12:05</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["4"]["classname"], "classID": tableData["day1"]["4"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["4"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["4"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["4"]["classname"], "classID": tableData["day2"]["4"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["4"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["4"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["4"]["classname"], "classID": tableData["day3"]["4"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["4"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["4"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["4"]["classname"], "classID": tableData["day4"]["4"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["4"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["4"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["4"]["classname"], "classID": tableData["day5"]["4"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["4"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["4"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["4"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["4"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>午</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>12:45<br />|<br />01:15</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile} style={{ "width": "100%" }} colSpan={showSat ? "6" : "5"}>
                            <div>午休</div>
                        </td>
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>5</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>13:20<br />|<br />14:10</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["5"]["classname"], "classID": tableData["day1"]["5"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["5"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["5"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["5"]["classname"], "classID": tableData["day2"]["5"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["5"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["5"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["5"]["classname"], "classID": tableData["day3"]["5"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["5"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["5"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["5"]["classname"], "classID": tableData["day4"]["5"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["5"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["5"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["5"]["classname"], "classID": tableData["day5"]["5"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["5"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["5"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["5"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["5"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>6</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>14:20<br />|<br />15:10</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["6"]["classname"], "classID": tableData["day1"]["6"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["6"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["6"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["6"]["classname"], "classID": tableData["day2"]["6"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["6"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["6"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["6"]["classname"], "classID": tableData["day3"]["6"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["6"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["6"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["6"]["classname"], "classID": tableData["day4"]["6"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["6"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["6"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["6"]["classname"], "classID": tableData["day5"]["6"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["6"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["6"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["6"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["6"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>7</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>15:20<br />|<br />16:10</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["7"]["classname"], "classID": tableData["day1"]["7"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["7"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["7"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["7"]["classname"], "classID": tableData["day2"]["7"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["7"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["7"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["7"]["classname"], "classID": tableData["day3"]["7"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["7"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["7"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["7"]["classname"], "classID": tableData["day4"]["7"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["7"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["7"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["7"]["classname"], "classID": tableData["day5"]["7"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["7"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["7"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["7"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["7"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                    <tr className={styles.classes}>
                        {isBigScreen ? <th className={join("noselect", styles.index)}>8</th> : <></>}
                        <th className={join("noselect", styles.indexMobile)}>16:20<br />|<br />17:10</th>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day1"]["8"]["classname"], "classID": tableData["day1"]["8"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day1"]["8"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day1"]["8"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day2"]["8"]["classname"], "classID": tableData["day2"]["8"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day2"]["8"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day2"]["8"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day3"]["8"]["classname"], "classID": tableData["day3"]["8"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day3"]["8"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day3"]["8"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day4"]["8"]["classname"], "classID": tableData["day4"]["8"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day4"]["8"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day4"]["8"]["teacher"]}</div>
                        </td>
                        <td className={isBigScreen ? styles.data : styles.dataMobile}>
                            <div className={styles.classname} onClick={() => { setDetail({ "name": tableData["day5"]["8"]["classname"], "classID": tableData["day5"]["8"]["classID"] }); setShowDetail(true); }}>{isLoading ? <></> : tableData["day5"]["8"]["classname"]}</div>
                            <div>{isLoading ? <></> : tableData["day5"]["8"]["teacher"]}</div>
                        </td>
                        {showSat ? (
                            <td className={isBigScreen ? styles.data : styles.dataMobile}>
                                <div className={styles.classname} onClick={() => { setShowDetail(true); setDetail(); }}>{isLoading ? <></> : tableData["day6"]["8"]["classname"]}</div>
                                <div>{isLoading ? <></> : tableData["day6"]["8"]["teacher"]}</div>
                            </td>
                        ) : (
                            <></>
                        )}
                    </tr>
                </tbody>
            </table>
        </div >
    );
}