import React from 'react'
import { CalendarDate, CaretUp } from 'react-bootstrap-icons' // CaretUp is an icon from react-bootstrap-icons <-- triangle shaped icon
import { calendarItems } from '../constants' // calendarItems is an array of strings exported from array inside ../constants.js directory


function Calendar(){
    
    return ( // syntax extension of JS, used with React to describe what the UI would look like. JSX in this block defines a hierarchical structure of HTML-like elements which will be rendered to DOM.
        <div className='Calendar'> {/* this div acts as the top-level container for entire calendar component. Its used for CSS styling purposes, defining the layout, spacing, etc. */}
            {/*Header Section <-- contains title and button*/}
            <div className="header">
                <div className="title"> {/* this div contains the title of the calendar component (refer to rendered page for clarity) */}
                    <CalendarDate size="18"/>
                    <p>Calendar</p>
                </div>
                <div className="btns"> {/* this div contains the button to toggle the calendar {show or hide} */}
                    <span>
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>

            {/*Bottom Subsection <-- contains items of CalendarItems = [x, x, x] array*/}
            <div className="items">
                {
                    calendarItems.map( item =>                   // map() method in action. Creates a new array populated with the results of calling a provided function on every element in the calling array.
                        <div className="item" key={item}>        {/* key={items} ensures that reach rendered component has unique id. This is smth related to React's state machine, it basically prevents already rendered
                                                                   object from being rendered twice */}
                            {item}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Calendar