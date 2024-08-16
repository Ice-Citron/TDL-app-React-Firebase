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
                        onChange={(newTime) => setTime(newTime, "HH:mm")} 
                    />
                </div>
                <div className="pick-project">
                    <div className="title">
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className="projects">
                        {
                            projects.map( project => 
                                <div className="project" key={project.id}>
                                    {project.name}
                                </div>    
                            )
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