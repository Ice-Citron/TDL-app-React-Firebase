import React from "react"

import logo from "../images/logo.png"


function User({ children }) {

    return (
        <div className="User">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="info">
                <p>SienarJaemus</p>
                <a href="https://www.youtube.com/">Logout!</a>
            </div>
        </div>
    )
}

export default User