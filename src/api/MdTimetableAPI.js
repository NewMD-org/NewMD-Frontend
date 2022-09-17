import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:4000'
    baseURL: 'https://newmdcloud.loca.lt'
});

export default class MdTimetableAPI {
    constructor(timeoutSeconds) {
        this.timeoutSeconds = timeoutSeconds * 1000;
    }

    login(ID, PWD, rememberMe) {
        return api.post('/cloud/users/login',
            JSON.stringify({ ID, PWD, rememberMe }),
            {
                timeout: this.timeoutSeconds,
                headers: {
                    'Content-Type': 'application/json',
                    'Bypass-Tunnel-Reminder': 'true' // Bypass local tunnel reminder page
                },
            }
        );
    }
}