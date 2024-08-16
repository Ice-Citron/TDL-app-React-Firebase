import React from "react"

import Todo from "./Todo"
import Next7Days from "./Next7Days"


function Todos(){
    const selectedProject = "today" // seems to be a value which determines what type of "todos" in a specific project to display 

    const todos = [ // for now we are just using a const array, later we will use firebase
        // array of todo objects here, each todo object has properties like unique id, text, time, date, day, checked, color, projec. Hard-coded for now
        {
            id : 'd54sd4',
            text : "Go for a run",
            time : "10:00 AM",
            date : "16/08/2024",
            day : "6",
            checked : false,
            color : '#e81a1a',
            project : 'personal'
        },
        {
            id : 'd54fdf',
            text : "Meeting",
            time : "09:00 AM",
            date : "18/08/2024",
            day : "1",
            checked : true,
            color : '#00ff00',
            project : 'work'
        }
    ]

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