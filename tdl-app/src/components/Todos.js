import React, { useContext } from "react"

import Todo from "./Todo"
import Next7Days from "./Next7Days"
import { TodoContext } from "../context"


function Todos(){
    const { todos, selectedProject } = useContext(TodoContext) // has been substituted, with useContext instead. Global data      // seems to be a value which determines what type of "todos" in a specific project to display 
                                                               // if neccesary, refer to what context is from NOTES. It's a way to pass data through the component tree without having to pass props down manually at every level.
                                                               // reduces cluttering, etc.

    return (
        <div className='Todos'> {/* this is the main container for the todos, or the basic structure. In here, the selected-project and list of todo will then be displayed. */}
            <div className='selected-project'>
                {selectedProject}
            </div>
            <div className="todos"> {/* this is the <div> container for the list of todos */}
            {
                selectedProject === "next 7 days" ? // ternary operator checks if selectedProject is "next 7 days", if true, it will display the Next7Days component, else it will display the list of todos
                    <Next7Days todos={todos} /> // passes in todos array as a prop
                :
                    todos.map( todo => 
                        <Todo todo={todo} key={todo.id} />  // maps through the todos array and displays each todo using the Todo component
                                                             // key is a special string attribute needed when creating list. 
                    )
            }
            </div>
        </div>
    )
}

export default Todos