import React, {useState, useContext} from 'react' // useState is a Hook that allows you to have state variables in functional components (true or false)
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons'
import fireDB from "../firebase";
import { collection, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import dayjs from "dayjs";

import { TodoContext } from '../context'


function Todo({todo}){
    // STATE
    const [hover, setHover] = useState(false) // useState is used here // static variable and a setter function, intialised to false

    // CONTEXT
    const { selectedTodo, setSelectedTodo } = useContext(TodoContext)

    const handleDelete = (todo) => {
        deleteTodo(todo)
        // if after deletion, the currently selected todo is the one being deleted, then set the selectedTodo to undefined (default value in a way)
        if (selectedTodo === todo) { setSelectedTodo(undefined) }
    }

    // CHANGED, to redress  for Firebase v9+
            // Constant variable which stores a function
            // async (todo) => {...} -- By initialising the function in this manner, it marks it as "async". Meaning it will handle asynchronous operations, using "await"
            //                          This function takes one arg "todo"
    const deleteTodo = async (todo) => { 
        try {
            const todosRef = collection(fireDB, 'todos');
            const todoDoc = doc(todosRef, todo.id);
            await deleteDoc(todoDoc); // await keyword is used to pause the execution of the function until "deleteDoc()" 's operation completes
            console.log('Todo deleted successfully');
        } 
        catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // CHANGED, to redress  for Firebase v9+
    const checkTodo = async (todo) => {
        const todosRef = collection(fireDB, 'todos');
    
        try {
            const todoDocRef = doc(todosRef, todo.id);
            await updateDoc(todoDocRef, { checked: !todo.checked }); // !todo.checked just sets the "checked" boolean to opposite of what it was
            console.log('Todo checked/unchecked successfully');
        } 
        catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // CHANGED, to redress  for Firebase v9+
    const repeatNextDay = async (todo) => {
        const todosRef = collection(fireDB, 'todos');
    
        try {
            const nextDayDate = dayjs(todo.date, 'MM/DD/YYYY').add(1, 'day');
            
            // Since this function is supposed to repeat a Todo task, or basically, the same exact task with its content is repeated, except for the due date which is changed to the next day
                        // this means that we are just copying the new object, except for giving it a new ID (by deleting old ID), and changing its "date" and "day" property
            const repeatedTodo = {
                ...todo,
                checked: false,
                date: nextDayDate.format('MM/DD/YYYY'),
                day: nextDayDate.format('d')
            };
    
            delete repeatedTodo.id;
    
            const newTodoRef = await addDoc(todosRef, repeatedTodo);
            console.log('Todo repeated for next day successfully', newTodoRef.id);
        } 
        catch (error) {
            console.error('Error repeating todo:', error);
        }
    };


    return ( // this is for each Todo object!
        <div className='Todo'>
            <div
                className="todo-container"
                onMouseEnter={() => setHover(true)}         // These sets the hover state to true when the mouse hovers over/enters the todo-container
                onMouseLeave={() => setHover(false)}        // and false when it leaves
            >
                <div className="check-todo" onClick={ () => checkTodo(todo) }>
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
                <div className="text" onClick={ () => setSelectedTodo(todo) }>           {/*now seems to be just by pressing the entire box alone, you get to select the current "selectedTodo*/}
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p> {/* if todo.checked is true, renders text color as gray, else black */}
                    <span>{todo.time} - {todo.projectName}</span>                             {/* renders time and project, for example "09:00 AM - work"         */}          
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>      {/* if todo.checked is true, render a line-through class, else empty <-- this is based on css definition. If todo object is
                                                                                                  checked, the className will become "line line-through" instead, which hence it will also be using properties defined for
                                                                                                  both ".line" and ".line-through", and since ".line-through" modifies the 1 gray pixel's width from 1 to 100, a line is
                                                                                                  formed! */}
                </div>
                <div className="add-to-next-day" onClick={ () => repeatNextDay(todo) }>
                    {
                        todo.checked && // Shows the refresh icon (clockwise arrow) only if the todo is checked (or task already completed. Which means to add the same task at same time but different date (next day))
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div className="delete-todo" onClick={ () => handleDelete(todo) }>
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