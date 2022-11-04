import { Message } from "./components/Message";
import logo from "./logo.svg";
import background from "./background.svg";
import styles from "./PrivacyPolicy.module.css"


export function PrivacyPolicyPage() {
    return (
        <div className={styles.background} style={{ backgroundImage: `url(${background})` }}>
            <img alt="logo" src={logo} className={styles.logo} />
            <Message />
        </div>
    );
}