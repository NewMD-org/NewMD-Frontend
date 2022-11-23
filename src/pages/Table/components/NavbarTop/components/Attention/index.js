import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MdTimetableAPI from "../../../../../../api/MdTimetableAPI";
import styles from "./Attention.module.css";


function join(...array) {
    return array.join(" ");
}

export function Attention({ setIsLoading, setShowAttention, setUserDataStatus, authorization }) {
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const saveData = async (token) => {
        setIsLoading(true);
        try {
            console.log("Saving user data . . .");
            const response = await new MdTimetableAPI(60).save(token);
            if (response.status === 200) {
                const response = await new MdTimetableAPI(40).read(token);
                if (response.status === 200) {
                    setUserDataStatus("true");
                    navigate("/table", { state: { "userDataStatus": true, "tableData": response.data["table"], "year": response.data["year"] }, replace: true });
                    console.log("Success");
                }
                else {
                    throw Error("Joanne is smart");
                };
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
                console.log(err);
            };
        }
        finally {
            setIsLoading(false);
        };
    };

    const closeModal = useCallback(_ => {
        setAgree(false);
        setShowAttention(false);
    }, [setShowAttention]);

    useEffect(() => {
        if (agree === true) {
            saveData(authorization);
            closeModal();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agree]);

    return (
        <div className={join(styles.modal_container, "noselect")}>
            <div className={styles.outside_close} onClick={() => closeModal()}></div>
            <div className={join(styles.modal, "fadeIn")} style={{ "--fadeInDuration": "1s" }}>
                <h1 className={styles.modal__title}>Attention !</h1>
                <p className={styles.modal__text}>Enabling the "Save Data" option means that your account and password will be stored in our server!</p>
                <p className={styles.modal__footer}>Please head to our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" title="Privacy Policy">Privacy Policy</a> page for more information.</p>
                <div className={styles.button_container}>
                    <button className={styles.button_cancel} onClick={() => closeModal()}>Cancel</button>
                    <button className={styles.button_continue} onClick={() => setAgree(true)}>Continue &rarr;</button>
                </div>
            </div>
        </div >
    );
}