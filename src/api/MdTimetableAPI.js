import axios from "axios";


const api = axios.create({
    baseURL: "https://cloud.newmd.eu.org"
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

    read(jwt) {
        return api.get("/database/read",
            {
                timeout: this.timeoutSeconds,
                headers: {
                    "Authorization": jwt,
                },
            }
        );
        // return {
        //     "status": 200,
        //     "data": {
        //         "table": {
        //             "day1": {
        //                 "1": {
        //                     "classname": "體育",
        //                     "teacher": "黃俊嘉",
        //                     "classID": "2041958",
        //                     "meet": "https://meet.google.com/ckg-sxmp-dnb",
        //                     "classroom": "srf4pzg"
        //                 },
        //                 "2": {
        //                     "classname": "體育",
        //                     "teacher": "黃俊嘉",
        //                     "classID": "2041975",
        //                     "meet": "https://meet.google.com/ckg-sxmp-dnb",
        //                     "classroom": "srf4pzg"
        //                 },
        //                 "3": {
        //                     "classname": "全民國防教育",
        //                     "teacher": "沈文偉",
        //                     "classID": "2016212",
        //                     "meet": "https://meet.google.com/yzg-vowh-xqj",
        //                     "classroom": "nsbz4ge"
        //                 },
        //                 "4": {
        //                     "classname": "數學",
        //                     "teacher": "邱立璿",
        //                     "classID": "1982527",
        //                     "meet": "https://meet.google.com/znm-hbjm-tba",
        //                     "classroom": "yiafrez"
        //                 },
        //                 "5": {
        //                     "classname": "音樂",
        //                     "teacher": "劉孟穎",
        //                     "classID": "2071904",
        //                     "meet": "https://meet.google.com/vxv-foax-aof",
        //                     "classroom": "ualpcwx"
        //                 },
        //                 "6": {
        //                     "classname": "基礎電子實習",
        //                     "teacher": "黃凱威",
        //                     "classID": "2017461",
        //                     "meet": "https://meet.google.com/obr-jvhx-owr",
        //                     "classroom": "n5sz7dd"
        //                 },
        //                 "7": {
        //                     "classname": "基礎電子實習",
        //                     "teacher": "黃凱威",
        //                     "classID": "2017478",
        //                     "meet": "https://meet.google.com/obr-jvhx-owr",
        //                     "classroom": "n5sz7dd"
        //                 },
        //                 "8": {
        //                     "classname": "基礎電子實習(輔)",
        //                     "teacher": "黃凱威",
        //                     "classID": "2017495",
        //                     "meet": "https://meet.google.com/obr-jvhx-owr",
        //                     "classroom": "n5sz7dd"
        //                 }
        //             },
        //             "day2": {
        //                 "1": {
        //                     "classname": "國語文",
        //                     "teacher": "陳聯華",
        //                     "classID": "1945532",
        //                     "meet": "https://meet.google.com/jhn-oghj-vqn",
        //                     "classroom": "lsbr6d2"
        //                 },
        //                 "2": {
        //                     "classname": "基本電學實習",
        //                     "teacher": "柯尚仁",
        //                     "classID": "2016891",
        //                     "meet": "https://meet.google.com/opn-ubpu-faj",
        //                     "classroom": "64znh35"
        //                 },
        //                 "3": {
        //                     "classname": "基本電學實習",
        //                     "teacher": "柯尚仁",
        //                     "classID": "2016912",
        //                     "meet": "https://meet.google.com/opn-ubpu-faj",
        //                     "classroom": "64znh35"
        //                 },
        //                 "4": {
        //                     "classname": "基本電學實習",
        //                     "teacher": "柯尚仁",
        //                     "classID": "2016933",
        //                     "meet": "https://meet.google.com/opn-ubpu-faj",
        //                     "classroom": "64znh35"
        //                 },
        //                 "5": {
        //                     "classname": "數學",
        //                     "teacher": "邱立璿",
        //                     "classID": "1982547",
        //                     "meet": "https://meet.google.com/znm-hbjm-tba",
        //                     "classroom": "yiafrez"
        //                 },
        //                 "6": {
        //                     "classname": "歷史",
        //                     "teacher": "蘇博群",
        //                     "classID": "1996272",
        //                     "meet": "https://meet.google.com/thg-danj-ban",
        //                     "classroom": "ut3fppi"
        //                 },
        //                 "7": {
        //                     "classname": "物理B",
        //                     "teacher": "陳永富",
        //                     "classID": "2004034",
        //                     "meet": "https://meet.google.com/tyy-nvyn-yoh",
        //                     "classroom": "eknfkc4"
        //                 },
        //                 "8": {
        //                     "classname": "英語文(輔)",
        //                     "teacher": "楊右銘",
        //                     "classID": "2071886",
        //                     "meet": "https://meet.google.com/zgx-ervc-ocz?authuser=0",
        //                     "classroom": "2jdhkzl"
        //                 }
        //             },
        //             "day3": {
        //                 "1": {
        //                     "classname": "電腦繪圖實習",
        //                     "teacher": "蔡椿華",
        //                     "classID": "2017203",
        //                     "meet": "https://meet.google.com/bfo-bghy-uqk",
        //                     "classroom": "3ibn6al"
        //                 },
        //                 "2": {
        //                     "classname": "電腦繪圖實習",
        //                     "teacher": "蔡椿華",
        //                     "classID": "2017224",
        //                     "meet": "https://meet.google.com/bfo-bghy-uqk",
        //                     "classroom": "3ibn6al"
        //                 },
        //                 "3": {
        //                     "classname": "物理B",
        //                     "teacher": "陳永富",
        //                     "classID": "2004013",
        //                     "meet": "https://meet.google.com/tyy-nvyn-yoh",
        //                     "classroom": "eknfkc4"
        //                 },
        //                 "4": {
        //                     "classname": "彈性學習",
        //                     "teacher": "楊右銘",
        //                     "classID": "2071924",
        //                     "meet": "https://meet.google.com/zgx-ervc-ocz?authuser=0",
        //                     "classroom": "2jdhkzl"
        //                 },
        //                 "5": {
        //                     "classname": "美術",
        //                     "teacher": "馮天文",
        //                     "classID": "1932311",
        //                     "meet": "https://meet.google.com/uku-sbpi-zai",
        //                     "classroom": "nkqeua4"
        //                 },
        //                 "6": {
        //                     "classname": "基本電學",
        //                     "teacher": "林順進",
        //                     "classID": "2016789",
        //                     "meet": "https://meet.google.com/bjn-jzxn-wtn",
        //                     "classroom": "vgxtrvn"
        //                 },
        //                 "7": {
        //                     "classname": "基本電學",
        //                     "teacher": "林順進",
        //                     "classID": "2016810",
        //                     "meet": "https://meet.google.com/bjn-jzxn-wtn",
        //                     "classroom": "vgxtrvn"
        //                 },
        //                 "8": {
        //                     "classname": "國語文(輔)",
        //                     "teacher": "陳聯華",
        //                     "classID": "1945553",
        //                     "meet": "https://meet.google.com/jhn-oghj-vqn",
        //                     "classroom": "lsbr6d2"
        //                 }
        //             },
        //             "day4": {
        //                 "1": {
        //                     "classname": "歷史",
        //                     "teacher": "蘇博群",
        //                     "classID": "1996293",
        //                     "meet": "https://meet.google.com/thg-danj-ban",
        //                     "classroom": "ut3fppi"
        //                 },
        //                 "2": {
        //                     "classname": "生活科技",
        //                     "teacher": "茆育詠",
        //                     "classID": "2049965",
        //                     "meet": "https://meet.google.com/kra-hrye-kgt",
        //                     "classroom": "xmclnio"
        //                 },
        //                 "3": {
        //                     "classname": "國語文",
        //                     "teacher": "陳聯華",
        //                     "classID": "1945574",
        //                     "meet": "https://meet.google.com/jhn-oghj-vqn",
        //                     "classroom": "lsbr6d2"
        //                 },
        //                 "4": {
        //                     "classname": "生涯規劃",
        //                     "teacher": "余文壇",
        //                     "classID": "2048549",
        //                     "meet": "https://meet.google.com/rjj-xtjj-xda?authuser=0",
        //                     "classroom": "s3qrkmc"
        //                 },
        //                 "5": {
        //                     "classname": "數學",
        //                     "teacher": "邱立璿",
        //                     "classID": "1982568",
        //                     "meet": "https://meet.google.com/znm-hbjm-tba",
        //                     "classroom": "yiafrez"
        //                 },
        //                 "6": {
        //                     "classname": "英語文",
        //                     "teacher": "楊右銘",
        //                     "classID": "1964395",
        //                     "meet": "https://meet.google.com/zgx-ervc-ocz?authuser=0",
        //                     "classroom": "2jdhkzl"
        //                 },
        //                 "7": {
        //                     "classname": "程式語言",
        //                     "teacher": "呂信寬",
        //                     "classID": "2017005",
        //                     "meet": "https://meet.google.com/ktt-zbey-sno",
        //                     "classroom": "2by5qbn"
        //                 },
        //                 "8": {
        //                     "classname": "程式語言(輔)",
        //                     "teacher": "呂信寬",
        //                     "classID": "2017026",
        //                     "meet": "https://meet.google.com/ktt-zbey-sno",
        //                     "classroom": "2by5qbn"
        //                 }
        //             },
        //             "day5": {
        //                 "1": {
        //                     "classname": "數學",
        //                     "teacher": "邱立璿",
        //                     "classID": "1982588",
        //                     "meet": "https://meet.google.com/znm-hbjm-tba",
        //                     "classroom": "yiafrez"
        //                 },
        //                 "2": {
        //                     "classname": "英語文",
        //                     "teacher": "楊右銘",
        //                     "classID": "1964374",
        //                     "meet": "https://meet.google.com/zgx-ervc-ocz?authuser=0",
        //                     "classroom": "2jdhkzl"
        //                 },
        //                 "3": {
        //                     "classname": "基本電學",
        //                     "teacher": "林順進",
        //                     "classID": "2016769",
        //                     "meet": "https://meet.google.com/bjn-jzxn-wtn",
        //                     "classroom": "vgxtrvn"
        //                 },
        //                 "4": {
        //                     "classname": "健康與護理",
        //                     "teacher": "陳怡如",
        //                     "classID": "2047444",
        //                     "meet": "https://meet.google.com/poz-mtpj-nuy",
        //                     "classroom": "s4c22uy"
        //                 },
        //                 "5": {
        //                     "classname": "技高課內社團-Javascript起步走",
        //                     "teacher": "周祜民",
        //                     "classID": "2058424",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "6": {
        //                     "classname": "技高課內社團-Javascript起步走",
        //                     "teacher": "周祜民",
        //                     "classID": "2058433",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "7": {
        //                     "classname": "團體活動(班會)",
        //                     "teacher": "呂信寬",
        //                     "classID": "1929471",
        //                     "meet": "https://meet.google.com/gey-yzmu-hrj",
        //                     "classroom": "gjblb6j"
        //                 },
        //                 "8": {
        //                     "classname": "英語會話A(輔)",
        //                     "teacher": "Paul",
        //                     "classID": "1965277",
        //                     "meet": "https://meet.google.com/vta-jmmk-wcn",
        //                     "classroom": "3udljmv"
        //                 }
        //             },
        //             "day6": {
        //                 "1": {
        //                     "classname": "test1",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "2": {
        //                     "classname": "test2",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "3": {
        //                     "classname": "test3",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "4": {
        //                     "classname": "",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "5": {
        //                     "classname": "test4",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "6": {
        //                     "classname": "",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "7": {
        //                     "classname": "",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 },
        //                 "8": {
        //                     "classname": "",
        //                     "teacher": "",
        //                     "classID": "",
        //                     "meet": "",
        //                     "classroom": ""
        //                 }
        //             }
        //         }
        //     }
        // }
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