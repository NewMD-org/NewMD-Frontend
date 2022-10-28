// import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./ClassesTable.module.css";


function join(...array) {
    return array.join(" ");
}

export function ClassesTable() {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <tbody>
                    <tr className={"noselect"}>
                        <th className={styles.index}></th>
                        <th className={join(styles.index, styles.days)}>Day 1</th>
                        <th className={join(styles.index, styles.days)}>Day 2</th>
                        <th className={join(styles.index, styles.days)}>Day 3</th>
                        <th className={join(styles.index, styles.days)}>Day 4</th>
                        <th className={join(styles.index, styles.days)}>Day 5</th>
                        <th className={join(styles.index, styles.days)}>Day 6</th>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>1</th>
                        <td className={styles.data} id="d1n1">
                            <div>This</div>
                        </td>
                        <td className={styles.data}>
                            <div>Page</div>
                        </td>
                        <td className={styles.data}>
                            <div>Is</div>
                        </td>
                        <td className={styles.data}>
                            <div>Not</div>
                        </td>
                        <td className={styles.data}>
                            <div>Finish</div>
                        </td>
                        <td className={styles.data}>
                            <div>Yet</div>
                        </td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>2</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>3</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>4</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>5</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>6</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>7</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                    <tr className={styles.classes}>
                        <th className={join("noselect", styles.index)}>8</th>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                        <td className={styles.data}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}