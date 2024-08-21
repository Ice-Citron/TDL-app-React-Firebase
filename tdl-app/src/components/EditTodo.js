import React, {useState, useContext, useEffect} from 'react'

import TodoForm from './TodoForm'
import { TodoContext } from '../context'

import fireDB from "../firebase"
import { collection, doc, updateDoc} from "firebase/firestore"
import dayjs from 'dayjs'


function EditTodo(){
    // STATE
    const [text, setText] = useState("")
    const [day, setDay] = useState(new dayjs().startOf('day'));
    const [time, setTime] = useState(new dayjs().startOf('minute'));
    const [todoProject, setTodoProject] = useState("") // from part 14 --> useEffect hook

    // CONTEXT
    const { selectedTodo, projects } = useContext(TodoContext)

    useEffect(() => {
        if (selectedTodo) { //  seems to just be setting the current STATE to the selectedTodo's properties, so when editing, will remain consistent between STATE initial values and new edited values
            setText(selectedTodo.text);
            setDay(dayjs(selectedTodo.date, 'MM/DD/YYYY'));
            setTime(dayjs(selectedTodo.time, 'hh:mm A'));
            setTodoProject(selectedTodo.projectName);
        }
    }, [selectedTodo]); // only called when selectedTodo changes, which makes sense, because we don't want to change current value unless we have switched to a different Todo

    useEffect(() => {
        if (selectedTodo) {
            const todosRef = collection(fireDB, 'todos');
            const todoDoc = doc(todosRef, selectedTodo.id);
            
            const updateTodo = async () => {
                try {
                    await updateDoc(todoDoc, {
                        text,
                        date: dayjs(day).format('MM/DD/YYYY'),
                        day: dayjs(day).format('d'),
                        time: dayjs(time).format('hh:mm A'),
                        projectName: todoProject
                    }); // updates Document in Firestore with new values
                    console.log('Todo updated successfully');
                } 
                catch (error) {
                    console.error('Error updating todo:', error);
                }
            };
    
            updateTodo();
        }
    }, [text, day, time, todoProject]);

    function handleSubmit(e) {}

    return (
        <div>
            {
            selectedTodo &&
            <div className='EditTodo'>
                <div className="header">
                    Edit Todo
                </div>
                <div className="container">
                    <TodoForm
                        handleSubmit={handleSubmit}
                        text={text}
                        setText={setText}
                        day={day}
                        setDay={setDay}
                        time={time}
                        setTime={setTime}
                        todoProject={todoProject}
                        setTodoProject={setTodoProject}
                        projects={projects}
                    />
                </div>
            </div>
            }
        </div>
    )
}

export default EditTodo