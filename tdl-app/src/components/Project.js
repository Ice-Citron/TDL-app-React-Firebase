import React from "react"

import RenameProject from "./RenameProject"


function Project({ children }) {

    return (
        <div className="Project">
            <RenameProject />
        </div>
    )
}

export default Project