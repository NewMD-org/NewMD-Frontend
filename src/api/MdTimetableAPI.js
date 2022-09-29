import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:4000"
    baseURL: "https://newmdcloud.loca.lt"
});

export default class MdTimetableAPI {
    constructor(timeoutSec) {
        this.timeoutSeconds = timeoutSec * 1000 | 0;
        console.log(this.timeoutSeconds);
    }

    login(ID, PWD, rememberMe) {
        return api.post("/cloud/users/login",
            JSON.stringify({ ID, PWD, rememberMe }),
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Content-Type": "application/json",
                    "Bypass-Tunnel-Reminder": "true" // Bypass local tunnel reminder page
                },
            }
        );
    }
}