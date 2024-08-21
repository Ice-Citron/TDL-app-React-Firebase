import React, {useContext, useEffect, useState} from 'react' // import useState

import Modal from './Modal'
import TodoForm from './TodoForm';
import { TodoContext } from '../context' // no need to specify to import from "index.js" file, because Node.js will automatically look for it by default
import { calendarItems} from "../constants"

import fireDB from "../firebase"
import { collection, addDoc } from "firebase/firestore"
import randomcolor from "randomcolor"
import dayjs from 'dayjs'; // import dayjs <-- to facilitate defaultTime()                          // DEPRECATED --> import DateFnsUtils from '@date-io/date-fns';


function AddNewTodo(){
    // CONTEXT
    const { projects, selectedProject } = useContext(TodoContext);

    // STATE
            // showModal = default variable of false. This will be used to show or hide the modal
            // setShowModal = function that will be used to update the state of "showModal"
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');                                   // new, from part 6
    const [day, setDay] = useState(new dayjs().startOf('day'));             // using .startOf('day') to set the time to 00:00:00 // this also chooses today for date by default
    const [time, setTime] = useState(new dayjs().startOf('minute'));        // this chooses the current time, to the current minute by default
    const [todoProject, setTodoProject] = useState(selectedProject);        // from part 14, NEW, for useEffect hook   

    function handleSubmit(e) {
        e.preventDefault() // need to check what this is with claude

        if( text && !calendarItems.includes(todoProject)) {
            const todosRef = collection(fireDB, 'todos');

            addDoc(todosRef, {
                text : text,
                date : dayjs(day).format('MM/DD/YYYY'),
                day : dayjs(day).format('d'),
                time : dayjs(time).format('hh:mm A'),
                checked : false,
                color : randomcolor(),
                projectName : todoProject
            })

            setShowModal(false)
            setText('')
            setDay(new dayjs().startOf('day'))
            setTime(new dayjs().startOf('minute')) // fixed problem of invalid date format. Need to re-create date using original values as seen with state intialisation values here,
                                                   // the purpose is to ensure that the default date and time is reset to the current date and time, after the form is submitted (which their
                                                   // respective values were modified at this stage)
        }
    }

    useEffect( () => {
        setTodoProject(selectedProject)
    }, [selectedProject])


    return ( // begins the JSX statement for rendering the modal's UI
        <div className='AddNewTodo'>                            {/*outer container for "AddNewTodo" component. It uses className, which is for reference during styling in css*/}
            <div className="btn">                               {/*inner container for button. It uses className, which is for reference during styling in css*/}
                <button onClick={() => setShowModal(true)}>     {/*button that will set "showModal" to true. It uses onClick to trigger the function setShowModal*/}
                    + New Todo 
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}> {/*Modal component that will be shown when "showModal" is true. It uses showModal and setShowModal as props
                                                                         The children component below basically won't be shown or executed, until showModal is set to true!*/}
                <TodoForm
                    handleSubmit={handleSubmit}
                    heading='Add new to do!'
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo // Ends the component definition, and exports the AddNewTodo component for use in other components // makes it available for other parts of the application to use