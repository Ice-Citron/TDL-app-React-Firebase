import React, {useState} from 'react' // import useState
import Modal from './Modal'

import { Bell, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'; // deprecated library
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs'; // import dayjs <-- to facilitate defaultTime()                          // DEPRECATED --> import DateFnsUtils from '@date-io/date-fns';


function AddNewTodo(){
    // showModal = default variable of false. This will be used to show or hide the modal
    // setShowModal = function that will be used to update the state of "showModal"
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')                // new, from part 6
    const [day, setDay] = React.useState(new dayjs());  // const [day, setDay] = useState(new Date())
    const [time, setTime] = React.useState(new dayjs()) // const [time, setTime] = useState(new Date())

    return ( // begins the JSX statement for rendering the modal's UI
        <div className='AddNewTodo'>                            {/*outer container for "AddNewTodo" component. It uses className, which is for reference during styling in css*/}
            <div className="btn">                               {/*inner container for button. It uses className, which is for reference during styling in css*/}
                <button onClick={() => setShowModal(true)}>     {/*button that will set "showModal" to true. It uses onClick to trigger the function setShowModal*/}
                    + New Todo 
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}> {/*Modal component that will be shown when "showModal" is true. It uses showModal and setShowModal as props
                                                                         The children component below basically won't be shown or executed, until showModal is set to true!*/}
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form>
                        <div className="text">
                            <h3>Add new to do!</h3>
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
                                <div className="project active">
                                    personal
                                </div>
                                <div className="project">
                                    work
                                </div>
                                <div className="project">
                                    work
                                </div>
                            </div>
                        </div>
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <X size='40' />
                        </div>
                        <div className="confirm">
                            <button>+ Add to do</button>
                        </div>
                    </form>
                </LocalizationProvider>
            </Modal>
        </div>
    )
}

export default AddNewTodo // Ends the component definition, and exports the AddNewTodo component for use in other components // makes it available for other parts of the application to use