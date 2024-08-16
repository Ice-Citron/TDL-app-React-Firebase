import React, {useState} from 'react' // import useState
import Modal from './Modal'
import TodoForm from './TodoForm';

import dayjs from 'dayjs'; // import dayjs <-- to facilitate defaultTime()                          // DEPRECATED --> import DateFnsUtils from '@date-io/date-fns';


function AddNewTodo(){
    // showModal = default variable of false. This will be used to show or hide the modal
    // setShowModal = function that will be used to update the state of "showModal"
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')                // new, from part 6
    const [day, setDay] = React.useState(new dayjs());  // const [day, setDay] = useState(new Date())
    const [time, setTime] = React.useState(new dayjs()) // const [time, setTime] = useState(new Date())


    const projects = [
        { id : 1, name : "personal", numOfTodos : 0 },
        { id : 2, name : "work", numOfTodos : 1 },
        { id : 3, name : "other", numOfTodos : 2 }
    ]

    function handleSubmit(e) {

    }


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
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo // Ends the component definition, and exports the AddNewTodo component for use in other components // makes it available for other parts of the application to use