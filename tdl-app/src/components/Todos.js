import React, { useContext } from "react"

import Todo from "./Todo"
import Next7Days from "./Next7Days"
import { TodoContext } from "../context"


function Todos(){
    const { todos, selectedProject } = useContext(TodoContext) // has been substituted, with useContext instead. Global data      // seems to be a value which determines what type of "todos" in a specific project to display 
                                                               // if neccesary, refer to what context is from NOTES. It's a way to pass data through the component tree without having to pass props down manually at every level.
                                                               // reduces cluttering, etc.
                                            // it seems to be since this is a ever changing global data. By defining upstream, or inside hooks directory, which
                                            // is then subsequently linked to the context, it allows for the data from firebase to be used here for example,
                                            // very convenient, wihout having to pass props down manually at every level too.
                                                    // and since useEffect({}, []) enables the data to be continuously refreshed. Once the data is retrieved whenever
                                                    // a change is made. Then we just pass the props data down to each project like before!

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