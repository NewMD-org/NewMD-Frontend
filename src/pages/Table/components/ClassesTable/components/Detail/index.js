import { useCallback, useEffect, useState } from "react";
import styles from "./Detail.module.css";


export function Detail({ setShowDetail, setDetail, detail }) {
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = useCallback(_ => {
        setDetail({ "name": null, "classID": null });
        setShowDetail(false);
    }, [setShowDetail]);

    const viewVT = async (year, classID) => {
        console.log("Getting VT");
        console.log(classID);
        // if (Object.keys(cache).includes(classID)) {
        //     return cache[classID];
        // }
        // else {
        //     const response = await axios.get(`http://140.128.156.92/AACourses/Web/qVT.php?F_sPeriodsem=${year}&eID=${classID}`);
        //     if (response.status === 200) {
        //         const $ = load(response.data);
        //         const obj = {
        //             meet: $("#main > div:nth-child(3) > a").html() ? $("#main > div:nth-child(3) > a").html().replace(/ /g, "") : "",
        //             classroom: $("#main > div:nth-child(5)").html() ? $("#main > div:nth-child(5)").html() : ""
        //         };
        //         cache[classID] = obj;
        //         return obj;
        //     }
        //     else {
        //         throw new Error("Error during getting VT");
        //     };
        // };
    }

    useEffect(() => {
        viewVT("1111", detail["classID"]);
    }, []);

    return (
        <div className={styles.modal_container}>
            {isLoading ? (
                <>
                    <div className={styles.spinner_container}>
                        <div className={styles.spinner}></div>
                    </div>
                    <div className={styles.text_area}>
                        <p className={styles.title}>Waiting for too long ?</p>
                        <p className={styles.content}>Try enabling the "Save Data" option !</p>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.outside_close} onClick={() => closeModal()}></div>
                    <div className={styles.modal}>
                        <div className={styles.close_container}>
                            <p className={styles.close} onClick={() => closeModal()}>×</p>
                        </div>
                        <h1 className={styles.modal__title}>{detail["name"]}</h1>
                        <p className={styles.modal__text}>Sorry, this page isn't finished yet.</p>
                        {/* <div className={styles.button_container}>
                            <button className={styles.button_cancel} onClick={() => closeModal()}>Cancel</button>
                            <button className={styles.button_continue}>Continue &rarr;</button>
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
}