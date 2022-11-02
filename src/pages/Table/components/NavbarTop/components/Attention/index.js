import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MdTimetableAPI from "../../../../../../api/MdTimetableAPI";
import styles from "./Attention.module.css";


export function Attention({ setIsLoading, setShowAttention, setUserDataStatus, authorization }) {
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const saveData = async (token) => {
        setIsLoading(true);
        try {
            console.log("Saving user data . . .");
            const response = await new MdTimetableAPI(60).save(token);
            if (response.status === 200) {
                navigate("/table", { state: { "userDataStatus": true } });
                setUserDataStatus("true");
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
        <div className={styles.modal_container}>
            <div className={styles.outside_close} onClick={() => closeModal()}></div>
            <div className={styles.modal}>
                <div className={styles.close_container}>
                    <p className={styles.close} onClick={() => closeModal()}>×</p>
                </div>
                <h1 className={styles.modal__title}>Attention !</h1>
                <p className={styles.modal__text}>Enabling the "Save Data" option means that your account and password will be stored in our server !</p>
                <div className={styles.button_container}>
                    <button className={styles.button_cancel} onClick={() => closeModal()}>Cancel</button>
                    <button className={styles.button_continue} onClick={() => setAgree(true)}>Continue &rarr;</button>
                </div>
            </div>
        </div>
    );
}