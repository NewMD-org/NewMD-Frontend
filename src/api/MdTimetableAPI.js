import axios from "axios";


const api = axios.create({
    baseURL: "https://cloud.newmd.eu.org"
});

export default class MdTimetableAPI {
    constructor(timeoutSec) {
        this.timeoutSeconds = timeoutSec * 1000 | 0;
    }

    async login(ID, PWD, rememberMe) {
        const response = {
            error: true,
            status: null,
            message: null,
            data: {
                authorization: null,
                userDataStatus: null
            }
        };

        try {
            if (ID === "") {
                throw new Error("Missing Username.")
            }
            else if (PWD === "") {
                throw new Error("Missing Password.");
            };

            const res = await api.post("/users/login",
                JSON.stringify({ ID, PWD, rememberMe }),
                {
                    timeout: this.timeoutSeconds,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            response["error"] = false;
            response["status"] = res.status;
            response["data"]["authorization"] = res.headers["authorization"];
            response["data"]["userDataStatus"] = res.data["userDataStatus"];
        }
        catch (err) {
            const errorMessageFilter = [
                "Missing Username.",
                "Missing Password."
            ];

            const ststusCodeFilter = [
                400,
                401,
                500
            ];

            response["status"] = err.response?.status;

            if (errorMessageFilter.includes(err.message)) {
                response["message"] = err.message;
            }
            else if (ststusCodeFilter.includes(err.response?.status)) {
                response["message"] = err.response?.data;
            }
            else if (!err?.response) {
                response["message"] = "No Server Response.";
            }
            else {
                response["message"] = "Unexpected Error.";
            };
        };

        return response;
    }

    table(jwt) {
        return api.get("/table?meetURL=false",
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Authorization": jwt,
                },
            }
        );
    }

    viewvt(year, classID) {
        return api.get(`/viewvt?year=${year}&classID=${classID}`,
            {
                timeout: this.timeoutSeconds,
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