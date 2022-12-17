import { Message } from "./components/Message";
import logo from "./logo.svg";
import background from "./background.svg";
import styles from "./PrivacyPolicy.module.css";


function join(...array) {
    return array.join(" ");
}

export function PrivacyPolicyPage() {
    return (
        <div className={styles.background} style={{ backgroundImage: `url(${background})` }}>
            <img alt="logo" src={logo} className={join(styles.logo, "noselect")} draggable="false" />
            <Message />
        </div>
    );
}