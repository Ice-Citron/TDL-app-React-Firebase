import React from "react"
import { Plus } from "react-bootstrap-icons"


function AddNewProject() {

    return (
        // AddNewProject component is a button with a plus icon
        <div className="AddNewProject">
            <div className="add-button">
                <span>
                    <Plus size="20" />
                </span>
            </div>
        </div>
    )
}

export default AddNewProject