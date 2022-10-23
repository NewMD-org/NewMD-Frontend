import React from "react";
import "./index.css";


function random(x) {
    return Math.floor(Math.random() * x);
};

export function Loader() {
    const message = [
        "Your password stored in Mingdao's server isn't hashed!",
        "It dosn't matter if you input your account & password with capital letter.",
        "We won't store your data unless you enable \"Save Data\" option.",
        "We use MongoDB to store your data.",
        "This page is built by ReactJS.",
        "We will update your data at 24:00 every day."
    ];

    return (
        <div className="background">
            <div className="text-area">
                <p className="title">Do you know ?</p>
                <p className="content">{message[random(message.length)]}</p>
            </div>
            <div className="bouncing-loader">
                <p>Loading</p>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};