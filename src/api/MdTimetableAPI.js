import axios from "axios";

const api = axios.create({
    baseURL: "https://cloud.aaaaoncloud.eu.org"
});

export default class MdTimetableAPI {
    constructor(timeoutSec) {
        this.timeoutSeconds = timeoutSec * 1000 | 0;
    }

    login(ID, PWD, rememberMe) {
        return api.post("/users/login",
            JSON.stringify({ ID, PWD, rememberMe }),
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    read(jwt) {
        return api.get("/database/read",
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Authorization": jwt,
                },
            }
        );
    }

    save(jwt) {
        return api.get("/database/save",
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Authorization": jwt,
                },
            }
        );
    }

    delete(jwt) {
        return api.get("/database/delete",
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Authorization": jwt,
                },
            }
        );
    }
}