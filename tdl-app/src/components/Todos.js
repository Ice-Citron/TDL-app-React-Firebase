import React from "react"

import Todo from "./Todo"
import Next7Days from "./Next7Days"

function Todos({ children }) {

    return (
        <div className="Todos">
            <Todo></Todo>
            <Next7Days></Next7Days>
        </div>
    )
}

export default Todos