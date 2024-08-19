import React from 'react'

import { Bell, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'; // deprecated library
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


function TodoForm({ 
    // ToDoForm component will now be shared between "AddNewTodo" and "EditTodo" components
    // Hence, now we need to determine which props is neede, depending on the component that is using it, for example, when using EditTodo, we don't want button nor showModal nor heading, hence we don't pass
    // any value into them. And the code below uses the && operator to check if the value is true, then display it. If not, then don't display it.
        handleSubmit,
        heading = false,
        text, setText,
        day, setDay,
        time, setTime,
        todoProject, setTodoProject,
        projects,
        showButtons = false,
        setShowModal = false }) {

    return ( // begins the JSX statement for rendering the modal's UI
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit} className='TodoForm'>
                <div className="text">
                    {
                        heading && // if heading is true, as in contains a value. Then display it as header, this only applies for Adding a new todo object
                        <h3>{heading}</h3>
                    }
                    <input
                        id="TodoFormInput"
                        type='text'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder='To do ...'
                        autoFocus
                    />
                </div>
                <div className="remind">
                    <Bell />
                    <p>Remind Me!</p>
                </div>
                <div className="pick-day">
                    <div className="title">
                        <CalendarDay />
                        <p>Choose a day</p>
                    </div>
                    <DatePicker 
                        views={['month', 'day']} 
                        value={day} 
                        onChange={(newDay) => setDay(newDay)} 
                    />
                </div>
                <div className="pick-time">
                    <div className="title">
                        <Clock />
                        <p>Choose time</p>
                    </div>
                    <TimePicker 
                        value={time} 
                        onChange={(newTime) => setTime(newTime, "HH:mm A")} // A is needed, to include AM or PM
                    />
                </div>
                <div className="pick-project">
                    <div className="title">
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className="projects">
                        {
                            projects.length > 0 ? // render below is at least 1 project exists
                                projects.map( project => 
                                    <div
                                        className={`project ${todoProject === project.name ? "active" : ""}`} // if the project is active, then set the class to active, as in "project active", which means that
                                                                                                              // in CSS, the styling for .project and .active will apply to this
                                        onClick={() => setTodoProject(project.name)} // when a project (the button which is names this project) is clicked, set the project name to the todoProject
                                        key={project.id} // unique key id, this is default on ReactJS, each component has a key, to prevent re-rendering excessively when re-rendering is triggered
                                    >
                                        {project.name}
                                    </div>    
                                )
                            : // else if not project exists, print the message below in red
                                <div style={{color:'#ff0000'}}>
                                    Please add a project before proceeding
                                </div>
                        }
                    </div>
                </div>
                {
                    showButtons &&
                    <div>
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm">
                            <button>+ Add to do</button>
                        </div>
                    </div>
                }
            </form>
        </LocalizationProvider>
    )
}

export default TodoForm