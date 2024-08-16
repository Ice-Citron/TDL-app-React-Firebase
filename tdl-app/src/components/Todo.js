import React, {useState} from 'react' // useState is a Hook that allows you to have state variables in functional components (true or false)
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons'


function Todo({todo}){
    const [hover, setHover] = useState(false) // useState is used here // static variable and a setter function, intialised to false

    return ( // this is for each Todo object!
        <div className='Todo'>
            <div
                className="todo-container"
                onMouseEnter={() => setHover(true)}         // These sets the hover state to true when the mouse hovers over/enters the todo-container
                onMouseLeave={() => setHover(false)}        // and false when it leaves
            >
                <div className="check-todo">
                    {
                        todo.checked ?  // ternary operator checks if todo.checked is true or false // if true, render a GRAY checked circle, else render a colored unchecked circle (which is based on value in array)
                            <span className="checked">
                                <CheckCircleFill color="#bebebe" />
                            </span>
                        :
                            <span className="unchecked">
                                <Circle color={todo.color} />
                            </span>
                    }
                </div>
                <div className="text">
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p> {/* if todo.checked is true, renders text color as gray, else black */}
                    <span>{todo.time} - {todo.project}</span>                                 {/* renders time and project, for example "09:00 AM - work"         */}          
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>      {/* if todo.checked is true, render a line-through class, else empty <-- this is based on css definition. If todo object is
                                                                                                  checked, the className will become "line line-through" instead, which hence it will also be using properties defined for
                                                                                                  both ".line" and ".line-through", and since ".line-through" modifies the 1 gray pixel's width from 1 to 100, a line is
                                                                                                  formed! */}
                </div>
                <div className="add-to-next-day">
                    {
                        todo.checked && // Shows the refresh icon (clockwise arrow) only if the todo is checked (or task already completed. Which means to add the same task at same time but different date (next day))
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div className="delete-todo">
                    {
                        (hover || todo.checked) && // Show the trash icon is todo is checked or {if unchecked, render the icon (if the mouse is hovering over the todo-container)}
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo